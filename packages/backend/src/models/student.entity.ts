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
import { UserModel } from '@backend/models/user.entity';

@Entity({ name: 'student' })
export class StudentModel {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column()
  @Index({ where: 'deleted_at IS NULL' })
  name: string;

  @Column({ type: 'bigint' })
  @Index({ unique: true, where: 'deleted_at IS NULL' })
  ra: number;

  @Column()
  @Index({ unique: true, where: 'deleted_at IS NULL' })
  cpf: string;

  @Column()
  @Index({ unique: true, where: 'deleted_at IS NULL' })
  @IsEmail()
  email: string;

  @Column()
  created_by: number;

  @Column()
  updated_by: number;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'created_by' })
  createdBy: UserModel;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: UserModel;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp' }) deleted_at?: Date;
}
