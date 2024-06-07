import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1712170617332 implements MigrationInterface {
    name = 'Migrations1712170617332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "server_metric" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "time" TIMESTAMP NOT NULL DEFAULT now(), "cpu" double precision NOT NULL, "networkIn" double precision NOT NULL, "networkOut" double precision NOT NULL, "serverInstanceId" uuid, CONSTRAINT "REL_7226fdf2c2f2273d338a318040" UNIQUE ("serverInstanceId"), CONSTRAINT "PK_710ad1905447124eb0e9ad56aba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "server_instance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "instanceClass" character varying NOT NULL, "instanceState" character varying NOT NULL, "instanceId" character varying NOT NULL, "lastImportedAt" TIMESTAMP, "cloudProviderAccountId" uuid, CONSTRAINT "REL_160bcaa4aa232fd63d29b91d23" UNIQUE ("cloudProviderAccountId"), CONSTRAINT "PK_183bf00771bdfc7ced4a6c246aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."cloud_provider_account_provider_enum" AS ENUM('aws')`);
        await queryRunner.query(`CREATE TABLE "cloud_provider_account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "provider" "public"."cloud_provider_account_provider_enum" NOT NULL, "accessKeyId" character varying NOT NULL, "secretAccessKey" character varying NOT NULL, "region" character varying NOT NULL, "clientId" uuid, CONSTRAINT "REL_8febacd4dbc27c9ca5d0e8269b" UNIQUE ("clientId"), CONSTRAINT "PK_c5c4fb5ffddde6561a0b30e3fe6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "server_metric" ADD CONSTRAINT "FK_7226fdf2c2f2273d338a318040b" FOREIGN KEY ("serverInstanceId") REFERENCES "server_instance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "server_instance" ADD CONSTRAINT "FK_160bcaa4aa232fd63d29b91d23a" FOREIGN KEY ("cloudProviderAccountId") REFERENCES "cloud_provider_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cloud_provider_account" ADD CONSTRAINT "FK_8febacd4dbc27c9ca5d0e8269b9" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cloud_provider_account" DROP CONSTRAINT "FK_8febacd4dbc27c9ca5d0e8269b9"`);
        await queryRunner.query(`ALTER TABLE "server_instance" DROP CONSTRAINT "FK_160bcaa4aa232fd63d29b91d23a"`);
        await queryRunner.query(`ALTER TABLE "server_metric" DROP CONSTRAINT "FK_7226fdf2c2f2273d338a318040b"`);
        await queryRunner.query(`DROP TABLE "cloud_provider_account"`);
        await queryRunner.query(`DROP TYPE "public"."cloud_provider_account_provider_enum"`);
        await queryRunner.query(`DROP TABLE "server_instance"`);
        await queryRunner.query(`DROP TABLE "server_metric"`);
    }

}
