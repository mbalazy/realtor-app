import { Module, ModuleMetadata } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { User } from './user.entity';

export const UserModuleMeta: ModuleMetadata = {
  imports: [TypeOrmModule.forFeature([User]), DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService],
};
@Module(UserModuleMeta)
export class UserModule {}
