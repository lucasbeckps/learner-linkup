import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1712586193033 implements MigrationInterface {
    name = 'InitialMigration1712586193033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("user_id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_990ad5ebfde3bd6a0760c2b776" ON "user" ("user_id") WHERE deleted_at IS NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_8557bbc109108feac02aa23df0" ON "user" ("name") WHERE deleted_at IS NULL`);
        await queryRunner.query(`CREATE TABLE "student" ("student_id" SERIAL NOT NULL, "name" character varying NOT NULL, "ra" character varying NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_by" integer, CONSTRAINT "PK_be3689991c2cc4b6f4cf39087fa" PRIMARY KEY ("student_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c8e3a57fd3532197a539367f9f" ON "student" ("name") WHERE deleted_at IS NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f19cf2d4e21fb8c309c8c65d44" ON "student" ("ra") WHERE deleted_at IS NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_36e0e35af63ff623e67c34fd62" ON "student" ("cpf") WHERE deleted_at IS NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_bb531bf664ad26266000a30603" ON "student" ("email") WHERE deleted_at IS NULL`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_b517861395c0c75b45a13e93adc" FOREIGN KEY ("created_by") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_b517861395c0c75b45a13e93adc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bb531bf664ad26266000a30603"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_36e0e35af63ff623e67c34fd62"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f19cf2d4e21fb8c309c8c65d44"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c8e3a57fd3532197a539367f9f"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8557bbc109108feac02aa23df0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_990ad5ebfde3bd6a0760c2b776"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
