import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthService } from 'src/user/auth/auth.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const mockAuthService = {
    signUp: () => ({
      token: 'aaaaaaa',
    }),
  };

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('/auth/signup (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .expect(201)
      .expect({
        token: 'aaaaaaa',
      });
  });
});
