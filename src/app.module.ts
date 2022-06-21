import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EnvModule } from './env/env.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, EnvModule, HomeModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
