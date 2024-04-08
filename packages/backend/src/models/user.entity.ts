import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StudentModel } from '@backend/models/student.entity';

@Entity({ name: 'user' })
@Index(['name'], { where: 'deleted_at IS NULL' })
export class UserModel {
  @PrimaryGeneratedColumn()
  @Index(['user_id'], { where: 'deleted_at IS NULL' })
  user_id: number;

  @Column()
  name: string;

  @OneToMany(() => StudentModel, (student) => student.created_by)
  students: StudentModel[];

  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
  @DeleteDateColumn() deleted_at?: Date;
}
