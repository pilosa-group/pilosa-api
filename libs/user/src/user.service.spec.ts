import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from '@app/user/entities/user.entity';
import { getRepositoryToken } from '@mikro-orm/nestjs';

const mockUserRepository = {};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,

        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
