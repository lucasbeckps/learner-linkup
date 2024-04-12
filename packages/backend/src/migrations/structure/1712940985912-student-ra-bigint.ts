import { MigrationInterface, QueryRunner } from "typeorm";

export class StudentRaBigint1712940985912 implements MigrationInterface {
    name = 'StudentRaBigint1712940985912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`alter table student alter column ra type bigint using ra::bigint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
