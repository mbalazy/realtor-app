import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Home } from '../home/home.entity';
import { EnvModule } from '../env/env.module';
import { User } from '../user/user.entity';
import { Image } from '../image/image.entity';
import { Message } from '../message/message.entity';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT as any as number,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Home, User, Image, Message],
  synchronize: true,
  autoLoadEntities: true,
  // logging: true,
  dropSchema: process.env.DROP_DATABASE === 'true',
  // dropSchema: true
};

@Module({
  imports: [EnvModule, TypeOrmModule.forRoot(typeOrmConfig)],
})
export class DatabaseModule {}
