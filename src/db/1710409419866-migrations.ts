import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1710409419866 implements MigrationInterface {
    name = 'Migrations1710409419866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."cloud_import_type_enum" AS ENUM('aws', 'gcp', 'azure', 'other')`);
        await queryRunner.query(`CREATE TABLE "cloud_import" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "lastImportedAt" date NOT NULL, "type" "public"."cloud_import_type_enum" NOT NULL, CONSTRAINT "PK_ee66d0c4c898ddf99a647abefa0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cloud_import"`);
        await queryRunner.query(`DROP TYPE "public"."cloud_import_type_enum"`);
    }

}
