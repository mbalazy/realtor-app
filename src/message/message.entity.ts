import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Home } from '../home/home.entity';
import { User } from '../user/user.entity';

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: number;

  @ManyToOne(() => Home, (home) => home.message)
  home: Home;

  @ManyToOne(() => User, (user) => user.realtor_meggages)
  realtor: User;

  @ManyToOne(() => User, (user) => user.buyer_meggages)
  buyer: User;
}
