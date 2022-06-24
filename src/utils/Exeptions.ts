import { ConflictException, HttpException } from '@nestjs/common';

export class Exeptions {
  throwHttpExeption(message: string) {
    throw new HttpException(message, 400);
  }

  throwConflictExeption(message: string) {
    throw new ConflictException(
      `User with email address - ${message} already exist`,
    );
  }
}
