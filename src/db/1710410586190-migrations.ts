import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1710410586190 implements MigrationInterface {
    name = 'Migrations1710410586190'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cloud_import" RENAME COLUMN "type" TO "provider"`);
        await queryRunner.query(`ALTER TYPE "public"."cloud_import_type_enum" RENAME TO "cloud_import_provider_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."cloud_import_provider_enum" RENAME TO "cloud_import_type_enum"`);
        await queryRunner.query(`ALTER TABLE "cloud_import" RENAME COLUMN "provider" TO "type"`);
    }

}
