import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1718017378913 implements MigrationInterface {
    name = 'Migrations1718017378913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "browser_metric" DROP COLUMN "userAgent"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "browser_metric" ADD "userAgent" character varying`);
    }

}
