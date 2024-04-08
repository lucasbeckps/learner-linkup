import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { User } from '@backend/models/user.entity';

@Entity({ name: 'student' })
export class Student {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column()
  @Index({ where: 'deleted_at IS NULL' })
  name: string;

  @Column()
  @Index({ unique: true, where: 'deleted_at IS NULL' })
  ra: string;

  @Column()
  @Index({ unique: true, where: 'deleted_at IS NULL' })
  // TODO: Add validation for CPF
  cpf: string;

  @Column()
  @Index({ unique: true, where: 'deleted_at IS NULL' })
  @IsEmail()
  email: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
  @DeleteDateColumn() deleted_at?: Date;
}
