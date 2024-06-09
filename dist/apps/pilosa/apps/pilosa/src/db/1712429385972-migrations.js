"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1712429385972 = void 0;
class Migrations1712429385972 {
    constructor() {
        this.name = 'Migrations1712429385972';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "server_metric" ("time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "cpu" double precision NOT NULL, "networkIn" double precision, "networkOut" double precision, "diskReadOps" double precision, "diskWriteOps" double precision, "serverInstanceId" uuid, CONSTRAINT "PK_203e6e5ed11fe1892731ca8e6de" PRIMARY KEY ("time"))`);
        await queryRunner.query(`CREATE TABLE "server_instance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "class" character varying NOT NULL, "state" character varying NOT NULL, "instanceId" character varying NOT NULL, "tags" text NOT NULL, "cloudProviderAccountId" uuid, CONSTRAINT "PK_183bf00771bdfc7ced4a6c246aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."cloud_provider_account_provider_enum" AS ENUM('aws')`);
        await queryRunner.query(`CREATE TABLE "cloud_provider_account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "provider" "public"."cloud_provider_account_provider_enum" NOT NULL, "lastImportedAt" TIMESTAMP, "accessKeyId" character varying NOT NULL, "secretAccessKey" character varying NOT NULL, "region" character varying NOT NULL, "clientId" uuid, CONSTRAINT "PK_c5c4fb5ffddde6561a0b30e3fe6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "browser_metric" ("time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "domain" character varying NOT NULL, "path" character varying NOT NULL, "userAgent" character varying NOT NULL, "bytes" double precision NOT NULL, "bytesCached" double precision NOT NULL, "accuracy" double precision NOT NULL, "frontendAppId" uuid, CONSTRAINT "PK_daab45a91d62f3f31236b0003ba" PRIMARY KEY ("time"))`);
        await queryRunner.query(`CREATE TABLE "snippet_config" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "batchWaitTime" integer NOT NULL, "clientId" uuid, CONSTRAINT "REL_a137e7d06d28898bb238937efe" UNIQUE ("clientId"), CONSTRAINT "PK_55d6b563b8ca4464fa9ccd4601c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "frontend_app" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "urls" text NOT NULL, "clientId" uuid, CONSTRAINT "PK_38a769bb6e2f067554666b6d6be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "server_metric" ADD CONSTRAINT "FK_7226fdf2c2f2273d338a318040b" FOREIGN KEY ("serverInstanceId") REFERENCES "server_instance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "server_instance" ADD CONSTRAINT "FK_160bcaa4aa232fd63d29b91d23a" FOREIGN KEY ("cloudProviderAccountId") REFERENCES "cloud_provider_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cloud_provider_account" ADD CONSTRAINT "FK_8febacd4dbc27c9ca5d0e8269b9" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "browser_metric" ADD CONSTRAINT "FK_256ee8194f62cac35e5fafa5813" FOREIGN KEY ("frontendAppId") REFERENCES "frontend_app"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "snippet_config" ADD CONSTRAINT "FK_a137e7d06d28898bb238937efea" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "frontend_app" ADD CONSTRAINT "FK_3519d03545c53c7aa9cc29ca133" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`SELECT create_hypertable('server_metric', 'time');`);
        await queryRunner.query(`SELECT create_hypertable('browser_metric', 'time');`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "frontend_app" DROP CONSTRAINT "FK_3519d03545c53c7aa9cc29ca133"`);
        await queryRunner.query(`ALTER TABLE "snippet_config" DROP CONSTRAINT "FK_a137e7d06d28898bb238937efea"`);
        await queryRunner.query(`ALTER TABLE "browser_metric" DROP CONSTRAINT "FK_256ee8194f62cac35e5fafa5813"`);
        await queryRunner.query(`ALTER TABLE "cloud_provider_account" DROP CONSTRAINT "FK_8febacd4dbc27c9ca5d0e8269b9"`);
        await queryRunner.query(`ALTER TABLE "server_instance" DROP CONSTRAINT "FK_160bcaa4aa232fd63d29b91d23a"`);
        await queryRunner.query(`ALTER TABLE "server_metric" DROP CONSTRAINT "FK_7226fdf2c2f2273d338a318040b"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "frontend_app"`);
        await queryRunner.query(`DROP TABLE "snippet_config"`);
        await queryRunner.query(`DROP TABLE "browser_metric"`);
        await queryRunner.query(`DROP TABLE "cloud_provider_account"`);
        await queryRunner.query(`DROP TYPE "public"."cloud_provider_account_provider_enum"`);
        await queryRunner.query(`DROP TABLE "server_instance"`);
        await queryRunner.query(`DROP TABLE "server_metric"`);
    }
}
exports.Migrations1712429385972 = Migrations1712429385972;
//# sourceMappingURL=1712429385972-migrations.js.map