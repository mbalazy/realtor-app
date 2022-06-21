import { Test, TestingModule } from '@nestjs/testing';
import { UserModuleMeta } from '../user.module';
import { AuthService, SignupParams } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      UserModuleMeta,
    ).compile();

    service = module.get<AuthService>(AuthService);
  });

  const user: SignupParams = {
    phone: '12',
    name: 'mark',
    password: '12345',
    email: 'ww@wp.pl',
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', async () => {
    const response = await service.signup(user);
    expect(response).toHaveProperty('token');
  });

  it('should not create user with the same email', async () => {
    // first attempt - proper create user
    await service.signup(user);

    const secondAttempt = async () => await service.signup(user);

    expect(secondAttempt()).rejects.toThrow(
      'User with email address - ww@wp.pl already exist',
    );
  });
});
