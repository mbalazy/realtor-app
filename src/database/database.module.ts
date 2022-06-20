import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Home } from '../home/entity/home.entity';
import { EnvModule } from '../env/env.module';
import { User } from '../user/entity/user.entity';
import { Image } from '../image/entity/image.entity';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT as any as number,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Home, User, Image],
  synchronize: true,
  autoLoadEntities: true,
};

@Module({
  imports: [EnvModule, TypeOrmModule.forRoot(typeOrmConfig)],
})
export class DatabaseModule {}
