import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1712519543906 implements MigrationInterface {
    name = 'Init1712519543906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("user_id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "student" ("student_id" SERIAL NOT NULL, "name" character varying NOT NULL, "cpf" character varying NOT NULL, "ra" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_be3689991c2cc4b6f4cf39087fa" PRIMARY KEY ("student_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
