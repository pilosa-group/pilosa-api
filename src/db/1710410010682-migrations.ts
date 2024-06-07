import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1710410010682 implements MigrationInterface {
    name = 'Migrations1710410010682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cloud_import" ADD "clientId" uuid`);
        await queryRunner.query(`ALTER TABLE "cloud_import" ADD CONSTRAINT "UQ_7a767f728701b47ddc7714bf925" UNIQUE ("clientId")`);
        await queryRunner.query(`ALTER TYPE "public"."cloud_import_type_enum" RENAME TO "cloud_import_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."cloud_import_type_enum" AS ENUM('aws')`);
        await queryRunner.query(`ALTER TABLE "cloud_import" ALTER COLUMN "type" TYPE "public"."cloud_import_type_enum" USING "type"::"text"::"public"."cloud_import_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."cloud_import_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "cloud_import" ADD CONSTRAINT "FK_7a767f728701b47ddc7714bf925" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cloud_import" DROP CONSTRAINT "FK_7a767f728701b47ddc7714bf925"`);
        await queryRunner.query(`CREATE TYPE "public"."cloud_import_type_enum_old" AS ENUM('aws', 'gcp', 'azure', 'other')`);
        await queryRunner.query(`ALTER TABLE "cloud_import" ALTER COLUMN "type" TYPE "public"."cloud_import_type_enum_old" USING "type"::"text"::"public"."cloud_import_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."cloud_import_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."cloud_import_type_enum_old" RENAME TO "cloud_import_type_enum"`);
        await queryRunner.query(`ALTER TABLE "cloud_import" DROP CONSTRAINT "UQ_7a767f728701b47ddc7714bf925"`);
        await queryRunner.query(`ALTER TABLE "cloud_import" DROP COLUMN "clientId"`);
    }

}
