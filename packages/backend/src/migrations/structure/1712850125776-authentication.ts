import { MigrationInterface, QueryRunner } from "typeorm";

export class Authentication1712850125776 implements MigrationInterface {
    name = 'Authentication1712850125776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_8557bbc109108feac02aa23df0"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ba8de19442d86957a3aa3b5006" ON "user" ("email") WHERE deleted_at IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_ba8de19442d86957a3aa3b5006"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`CREATE INDEX "IDX_8557bbc109108feac02aa23df0" ON "user" ("name") WHERE (deleted_at IS NULL)`);
    }

}
