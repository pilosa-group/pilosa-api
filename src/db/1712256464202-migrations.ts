import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1712256464202 implements MigrationInterface {
    name = 'Migrations1712256464202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cloud_provider_account" ADD "lastImportedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cloud_provider_account" DROP COLUMN "lastImportedAt"`);
    }

}
