import { MigrationInterface, QueryRunner } from "typeorm";

export class StudentUpdatedBy1712866261715 implements MigrationInterface {
    name = 'StudentUpdatedBy1712866261715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" ADD "updated_by" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_b517861395c0c75b45a13e93adc"`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "created_by" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_b517861395c0c75b45a13e93adc" FOREIGN KEY ("created_by") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_3631bcf964aa634bc51366b92c8" FOREIGN KEY ("updated_by") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_3631bcf964aa634bc51366b92c8"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_b517861395c0c75b45a13e93adc"`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "created_by" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_b517861395c0c75b45a13e93adc" FOREIGN KEY ("created_by") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "updated_by"`);
    }

}
