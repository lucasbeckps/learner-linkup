import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class Student {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  name: string;

  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
  @DeleteDateColumn() deleted_at?: Date;
}
