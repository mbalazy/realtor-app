import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { oneMonthInSec } from 'src/consts';
import { SignupUserDto } from '../dtos/auth.dto';
import { User } from '../user.entity';

export type SignupParams = SignupUserDto;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signup({ email, password, name, phone }: SignupParams) {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException(
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

    await this.userRepository.save(newUser);

    const token = jwt.sign(
      {
        name,
        id: newUser.id,
      },
      process.env.JWT,
      {
        expiresIn: oneMonthInSec,
      },
    );

    return { token };
  }
}
