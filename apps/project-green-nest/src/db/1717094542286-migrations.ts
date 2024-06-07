import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1717094542286 implements MigrationInterface {
    name = 'Migrations1717094542286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "browser_metric" ALTER COLUMN "firstLoad" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "browser_metric" ALTER COLUMN "firstLoad" DROP NOT NULL`);
    }

}
