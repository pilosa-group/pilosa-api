import { CreateOrganizationDto } from '@app/project/dto/create-organization.dto';
import { Organization } from '@app/project/entities/organization.entity';
import { OrganizationMember } from '@app/project/entities/organization-member.entity';
import { OrganizationRole } from '@app/project/enum/organization-role.enum';
import { UserDto } from '@app/user/dto/user.dto';
import { UserService } from '@app/user/user.service';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/postgresql';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import slugify from 'slugify';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: EntityRepository<Organization>,
    private userService: UserService,
  ) {}

  async create(
    createOrganizationDto: CreateOrganizationDto,
    {
      userDto,
    }: {
      userDto: UserDto;
    },
  ): Promise<Organization> {
    const user = await this.userService.findOne(userDto.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const organization = new Organization();
    wrap(organization).assign(createOrganizationDto);

    organization.slug = this.slugify(organization.name);

    const member = new OrganizationMember();
    member.role = OrganizationRole.OWNER;
    member.organization = organization;
    member.user = user;

    return organization;
  }

  async findOne(
    slug: string,
    user: UserDto,
    requiredRoles: OrganizationRole[] = [
      OrganizationRole.MEMBER,
      OrganizationRole.OWNER,
    ],
  ): Promise<Organization | null> {
    return this.organizationRepository.findOne({
      members: {
        role: {
          $in: requiredRoles,
        },
        user: {
          id: user.id,
        },
      },
      slug,
    });
  }

  async remove(id: string, user: UserDto): Promise<void> {
    const organization = await this.findOne(id, user, [OrganizationRole.OWNER]);

    if (!organization) {
      throw new ForbiddenException();
    }

    await this.organizationRepository
      .getEntityManager()
      .removeAndFlush(organization);
  }

  async save(organization: Organization): Promise<Organization> {
    await this.organizationRepository
      .getEntityManager()
      .persistAndFlush(organization);

    return organization;
  }

  slugify(name: string): string {
    return slugify(name, {
      lower: true,
      strict: true,
    });
  }
}
