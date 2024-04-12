import { MigrationInterface, QueryRunner } from 'typeorm';

export class StudentRaNumeric1712891837519 implements MigrationInterface {
  name = 'StudentRaNumeric1712891837519';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f19cf2d4e21fb8c309c8c65d44"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" RENAME COLUMN "ra" TO "ra_old"`,
    );
    await queryRunner.query(`ALTER TABLE "student" ADD "ra" integer`);
    await queryRunner.query(`UPDATE "student" SET "ra" = "ra_old"::integer`);
    await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "ra_old"`);
    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "ra" SET NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_f19cf2d4e21fb8c309c8c65d44" ON "student" ("ra") WHERE deleted_at IS NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f19cf2d4e21fb8c309c8c65d44"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" RENAME COLUMN "ra" TO "ra_new"`,
    );
    await queryRunner.query(`ALTER TABLE "student" ADD "ra" character varying`);
    await queryRunner.query(`UPDATE "student" SET "ra" = "ra_new"::varchar`);
    await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "ra_new"`);
    await queryRunner.query(
      `ALTER TABLE "student" ALTER COLUMN "ra" SET NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_f19cf2d4e21fb8c309c8c65d44" ON "student" ("ra") WHERE deleted_at IS NULL`,
    );
  }
}
