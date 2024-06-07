import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1712699258574 implements MigrationInterface {
    name = 'Migrations1712699258574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }

}
