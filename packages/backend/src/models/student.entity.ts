import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'student' })
export class Student {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  ra: string;

  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
  @DeleteDateColumn() deleted_at?: Date;
}
