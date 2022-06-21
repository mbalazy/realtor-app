import { Home } from '../home/home.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: number;

  @ManyToOne(() => Home, (home) => home.images)
  home: Home;
}
