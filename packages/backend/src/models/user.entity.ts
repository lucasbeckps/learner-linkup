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
