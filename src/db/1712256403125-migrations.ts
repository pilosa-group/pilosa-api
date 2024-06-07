import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1712256403125 implements MigrationInterface {
    name = 'Migrations1712256403125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cloud_provider_account" DROP COLUMN "lastImportedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cloud_provider_account" ADD "lastImportedAt" TIMESTAMP`);
    }

}
