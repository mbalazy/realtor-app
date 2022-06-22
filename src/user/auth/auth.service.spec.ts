import { Test, TestingModule } from '@nestjs/testing';
import { UserModuleMeta } from '../user.module';
import { AuthService, SignUpParams } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      UserModuleMeta,
    ).compile();

    service = module.get<AuthService>(AuthService);
  });

  const user: SignUpParams = {
    phone: '12',
    name: 'mark',
    password: '12345',
    email: 'ww@wp.com',
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Sign up', () => {
    it('should create user', async () => {
      const response = await service.signUp(user);
      expect(response).toHaveProperty('token');
    });

    it('should not create user with the same email', async () => {
      // first attempt - proper create user
      await service.signUp(user);

      const secondAttempt = async () => await service.signUp(user);

      expect(secondAttempt()).rejects.toThrow(
        'User with email address - ww@wp.com already exist',
      );
    });
  });

  describe('Sign in', () => {
    it('should login user', async () => {
      await service.signUp(user);

      const response = await service.signIn(user);
      expect(response).toHaveProperty('token');
    });

    it('should not login user, wrong email', async () => {
      await service.signUp(user);

      const tryWrongEmail = async () =>
        await service.signIn({ ...user, email: 'wrong@wp.com' });

      expect(tryWrongEmail()).rejects.toThrow(
        "User with email address - wrong@wp.com don't exist",
      );
    });

    it('should not login user, wrong password', async () => {
      await service.signUp(user);

      const tryWrongPass = async () =>
        await service.signIn({ ...user, password: 'wrongOne' });

      expect(tryWrongPass()).rejects.toThrow('Wrong password');
    });
  });
});
