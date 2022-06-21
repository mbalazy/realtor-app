import { Home } from '../home/home.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from '../message/message.entity';

enum UserType {
  BUYER = 'buyer',
  REALTOR = 'realtor',
  ADMIN = 'admin',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.BUYER,
  })
  userType: UserType;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: number;

  @OneToMany(() => Home, (home) => home.images, { nullable: true })
  homes: Home[];

  @OneToMany(() => Message, (message) => message.buyer, { nullable: true })
  buyer_meggages: Message[];

  @OneToMany(() => Message, (message) => message.realtor, { nullable: true })
  realtor_meggages: Message[];
}
