import { MigrationInterface, QueryRunner } from 'typeorm';

export class Unaccent1712696747995 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION unaccent`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP EXTENSION unaccent`);
  }
}
