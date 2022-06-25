import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { oneMonthInSec } from 'src/consts';
import { Exeptions } from 'src/utils/Exeptions';
import { Repository } from 'typeorm';
import { SignInDto, SignUpDto } from '../dtos/auth.dto';
import { User } from '../user.entity';

export type SignUpParams = SignUpDto;
export type SignInParams = SignInDto;

@Injectable()
export class AuthService extends Exeptions {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super();
  }

  async signUp({ email, password, name, phone }: SignUpParams) {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      this.throwConflictExeption(
        `User with email address - ${email} already exist`,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      email,
      name,
      phone,
      password: hashedPassword,
    });

    await this.userRepository.insert(newUser);

    const token = this.generateToken({
      name,
      id: newUser.id,
    });

    return { token };
  }

  async signIn({ email, password }: SignInParams) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      this.throwConflictExeption(
        `User with email address - ${email} don't exist`,
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new HttpException('Wrong password', 400);
    }

    const token = this.generateToken({
      name: user.name,
      id: user.id,
    });

    return { token };
  }

  private generateToken(options: Record<string, string | number>) {
    return jwt.sign(options, process.env.JWT, {
      expiresIn: oneMonthInSec,
    });
  }
}
