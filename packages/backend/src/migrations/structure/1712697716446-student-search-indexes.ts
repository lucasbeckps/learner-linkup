import { MigrationInterface, QueryRunner } from "typeorm";

export class StudentSearchIndexes1712697716446 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX idx_student_name_normalized ON student USING btree (normalize_string(name)) WHERE deleted_at IS NULL`);
        await queryRunner.query(`CREATE INDEX idx_student_ra_normalized ON student USING btree (normalize_string(ra)) WHERE deleted_at IS NULL`);
        await queryRunner.query(`CREATE INDEX idx_student_cpf_normalized ON student USING btree (normalize_string(cpf)) WHERE deleted_at IS NULL`);
        await queryRunner.query(`CREATE INDEX idx_student_email_normalized ON student USING btree (normalize_string(email)) WHERE deleted_at IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX idx_student_name_normalized`);
        await queryRunner.query(`DROP INDEX idx_student_ra_normalized`);
        await queryRunner.query(`DROP INDEX idx_student_cpf_normalized`);
        await queryRunner.query(`DROP INDEX idx_student_email_normalized`);
    }

}
