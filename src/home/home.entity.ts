import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from '../image/image.entity';
import { Message } from '../message/message.entity';
import { User } from '../user/user.entity';

export enum PropertyType {
  RESIDENTAL = 'residental',
  CONDO = 'condo',
}

@Entity()
export class Home {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column({ type: 'int' })
  number_of_bedrooms: number;

  @Column({ type: 'float' })
  number_of_bathrooms: number;

  @Column()
  city: string;

  @Column({ nullable: true })
  listed_date: Date;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float' })
  land_size: number;

  @Column({
    type: 'enum',
    enum: PropertyType,
    default: PropertyType.CONDO,
  })
  propertyType: PropertyType;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Image, (image) => image.home, { nullable: true })
  images?: Image[];

  @ManyToOne(() => User, (user) => user.homes, { nullable: true })
  realtor?: User;

  @OneToMany(() => Message, (message) => message.home, { nullable: true })
  message?: Message[];
}
