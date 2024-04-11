import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserSeeder1712861994089 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "user" (user_id, name, created_at, updated_at, deleted_at, email, password) VALUES (1, 'Maria dos Santos', '2024-04-11 18:54:35.907995', '2024-04-11 18:54:35.907995', null, 'user@email.com', '$2b$10$MX96iq5m3Iq9DdghuNCKvO9YHHZ1iY7MTTUltzmDAlUsrmHwaVrA.')`,
    );
    await queryRunner.query(`SELECT setval('user_user_id_seq', 1)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM public."user" WHERE user_id IN (1)`);
  }
}
