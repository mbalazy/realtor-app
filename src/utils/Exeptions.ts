import { ConflictException, HttpException } from '@nestjs/common';

export class Exeptions {
  throwHttpExeption(message: string, code = 400) {
    throw new HttpException(message, code);
  }

  throwConflictExeption(message: string) {
    throw new ConflictException(
      `User with email address - ${message} already exist`,
    );
  }
}
