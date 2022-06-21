import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { User } from './user.entity';

export const UserModuleMeta = {
  imports: [TypeOrmModule.forFeature([User]), DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService],
};
@Module(UserModuleMeta)
export class UserModule {}
