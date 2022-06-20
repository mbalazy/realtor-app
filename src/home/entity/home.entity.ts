import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from '../../image/entity/image.entity';
import { Message } from '../../message/entity/message.entity';
import { User } from '../../user/entity/user.entity';

export enum PropertyType {
  RESIDENTAL = 'residental',
  CONDO = 'condo ',
}

@Entity()
export class Home extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column({ type: 'int' })
  number_of_bedrooms: number;

  @Column({ type: 'float' })
  number_of_bathrooms: number;

  @Column()
  city: number;

  @Column({ type: 'timestamp' })
  listed_date: number;

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
  created_at: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: number;

  @OneToMany(() => Image, (image) => image.home)
  images: Image[];

  @ManyToOne(() => User, (user) => user.homes)
  realtor: User;

  @OneToMany(() => Message, (message) => message.home)
  message: Message[];
}
