import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1710409874764 implements MigrationInterface {
    name = 'Migrations1710409874764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cloud_import" DROP COLUMN "lastImportedAt"`);
        await queryRunner.query(`ALTER TABLE "cloud_import" ADD "lastImportedAt" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cloud_import" DROP COLUMN "lastImportedAt"`);
        await queryRunner.query(`ALTER TABLE "cloud_import" ADD "lastImportedAt" date NOT NULL`);
    }

}
