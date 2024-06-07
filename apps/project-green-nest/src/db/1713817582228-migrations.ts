import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1713817582228 implements MigrationInterface {
    name = 'Migrations1713817582228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "browser_metric" ADD "ip" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "browser_metric" DROP COLUMN "ip"`);
    }

}
