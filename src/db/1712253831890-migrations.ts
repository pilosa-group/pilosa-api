import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1712253831890 implements MigrationInterface {
    name = 'Migrations1712253831890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "server_instance" DROP COLUMN "lastImportedAt"`);
        await queryRunner.query(`ALTER TABLE "cloud_provider_account" ADD "lastImportedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cloud_provider_account" DROP COLUMN "lastImportedAt"`);
        await queryRunner.query(`ALTER TABLE "server_instance" ADD "lastImportedAt" TIMESTAMP`);
    }

}
