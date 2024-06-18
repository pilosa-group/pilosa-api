import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1718016460011 implements MigrationInterface {
    name = 'Migrations1718016460011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "browser_metric" ADD "deviceType" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "browser_metric" DROP COLUMN "deviceType"`);
    }

}
