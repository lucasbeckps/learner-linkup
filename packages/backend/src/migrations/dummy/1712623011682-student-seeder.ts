import { MigrationInterface, QueryRunner } from 'typeorm';

export class StudentSeeder1712623011682 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO student (student_id, name, ra, cpf, email, created_at, updated_at, deleted_at, created_by) VALUES (1, 'Ana da Silva', '1234', '123-321-123-12', 'ana.ds@gmail.com', '2024-04-08 22:12:39.813232', '2024-04-08 22:12:39.813232', null, null)`,
    );
    await queryRunner.query(
      `INSERT INTO student (student_id, name, ra, cpf, email, created_at, updated_at, deleted_at, created_by) VALUES (2, 'João Alceu', '4321', '456-122-123-11', 'joao.a@gmail.com', '2024-04-08 22:12:39.813232', '2024-04-08 22:12:39.813232', null, null)`,
    );
    await queryRunner.query(
      `INSERT INTO student (student_id, name, ra, cpf, email, created_at, updated_at, deleted_at, created_by) VALUES (3, 'Marina Silva', '7654', '877-321-123-10', 'marina@gmail.com', '2024-04-08 22:12:39.813232', '2024-04-08 22:12:39.813232', null, null)`,
    );
    await queryRunner.query(
      `INSERT INTO student (student_id, name, ra, cpf, email, created_at, updated_at, deleted_at, created_by) VALUES (4, 'Carlos dos Santos', '4567', '323-621-323-12', 'carlinhos@gmail.com', '2024-04-08 22:12:39.813232', '2024-04-08 22:12:39.813232', null, null)`,
    );
    await queryRunner.query(
      `INSERT INTO student (student_id, name, ra, cpf, email, created_at, updated_at, deleted_at, created_by) VALUES (5, 'Júlia Oliveira', '8876', '823-421-523-11', 'juju@gmail.com', '2024-04-08 22:12:39.813232', '2024-04-08 22:12:39.813232', null, null)`,
    );
    await queryRunner.query(
      `INSERT INTO student (student_id, name, ra, cpf, email, created_at, updated_at, deleted_at, created_by) VALUES (6, 'Ana Pereira', '6778', '123-321-123-01', 'ana.pere@gmail.com', '2024-04-08 22:12:39.813232', '2024-04-08 22:12:39.813232', null, null)`,
    );
    await queryRunner.query(`SELECT setval('student_student_id_seq', 6)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM student WHERE student_id IN (1, 2, 3, 4, 5, 6)`,
    );
  }
}
