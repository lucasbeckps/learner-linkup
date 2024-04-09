import { MigrationInterface, QueryRunner } from 'typeorm';

export class NormalizeString1712696884665 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE OR REPLACE FUNCTION normalize_string(text) RETURNS text AS $$ BEGIN RETURN regexp_replace(unaccent($1), '[^a-zA-Z0-9]', '', 'g'); END; $$ LANGUAGE plpgsql IMMUTABLE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP FUNCTION normalize_string`);
  }
}
