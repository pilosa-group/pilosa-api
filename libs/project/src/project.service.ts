import { CreateProjectDto } from '@app/project/dto/create-project.dto';
import { Project } from '@app/project/entities/project.entity';
import { ProjectMember } from '@app/project/entities/project-member.entity';
import { ProjectRole } from '@app/project/enum/project-role.enum';
import { OrganizationService } from '@app/project/organization.service';
import { UserDto } from '@app/user/dto/user.dto';
import { UserService } from '@app/user/user.service';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { wrap } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: EntityRepository<Project>,
    private organizationService: OrganizationService,
    private userService: UserService,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    {
      organizationSlug,
      userDto,
    }: {
      organizationSlug: string;
      userDto: UserDto;
    },
  ): Promise<Project> {
    const organization = await this.organizationService.findOne(
      organizationSlug,
      userDto,
    );

    if (!organization) {
      throw new NotFoundException(
        `Organization "${organizationSlug} not found"`,
      );
    }

    const user = await this.userService.findOne(userDto.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const project = new Project();
    wrap(project).assign(createProjectDto);
    project.organization = organization;

    const member = new ProjectMember();
    member.role = ProjectRole.OWNER;
    member.project = project;
    member.user = user;

    return project;
  }

  findOne(id: string, user: UserDto): Promise<Project | null> {
    return this.projectRepository.findOne(
      {
        id,
        members: {
          user: {
            id: user.id,
          },
        },
      },
      {
        populate: ['organization'],
      },
    );
  }

  async remove(id: string, user: UserDto): Promise<void> {
    const project = await this.findOne(id, user);

    await this.projectRepository.getEntityManager().removeAndFlush(project);
  }

  async save(project: Project): Promise<Project> {
    await this.projectRepository.getEntityManager().persistAndFlush(project);

    return project;
  }

  // async findByUserRole(userProjectRole: UserProjectRole): Promise<Project> {
  //   return this.projectRepository.findOne(
  //     { userRoles: userProjectRole },
  //     { populate: ['userRoles'] },
  //   );
  // }
  //
  // async findById(id: string, user: User): Promise<Project | undefined> {
  //   return this.projectRepository
  //     .createQueryBuilder('p')
  //     .innerJoin('p.userRoles', 'upr')
  //     .where('p.id = :id', { id })
  //     .andWhere('upr.userId = :userId', { userId: user.id })
  //     .getOne();
  // }
  //
  // async findAllByOrganization(organization: Organization): Promise<Project[]> {
  //   return this.projectRepository
  //     .createQueryBuilder('p')
  //     .where('p.organizationId = :organizationId', {
  //       organizationId: organization.id,
  //     })
  //     .getMany();
  // }
}
