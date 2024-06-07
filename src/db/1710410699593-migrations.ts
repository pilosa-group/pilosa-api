import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1710410699593 implements MigrationInterface {
    name = 'Migrations1710410699593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cloud_import" ALTER COLUMN "lastImportedAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cloud_import" ALTER COLUMN "lastImportedAt" SET NOT NULL`);
    }

}
