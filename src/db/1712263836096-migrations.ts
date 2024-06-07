import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1712263836096 implements MigrationInterface {
    name = 'Migrations1712263836096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "browser_metric" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "time" TIMESTAMP NOT NULL DEFAULT now(), "domain" character varying NOT NULL, "path" character varying NOT NULL, "userAgent" character varying NOT NULL, "bytes" double precision NOT NULL, "bytesCached" double precision NOT NULL, "accuracy" double precision NOT NULL, "frontendAppId" uuid, CONSTRAINT "PK_447588c037da35451621ab49b75" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "frontend_app" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "clientId" uuid, CONSTRAINT "PK_38a769bb6e2f067554666b6d6be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "browser_metric" ADD CONSTRAINT "FK_256ee8194f62cac35e5fafa5813" FOREIGN KEY ("frontendAppId") REFERENCES "frontend_app"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "frontend_app" ADD CONSTRAINT "FK_3519d03545c53c7aa9cc29ca133" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "frontend_app" DROP CONSTRAINT "FK_3519d03545c53c7aa9cc29ca133"`);
        await queryRunner.query(`ALTER TABLE "browser_metric" DROP CONSTRAINT "FK_256ee8194f62cac35e5fafa5813"`);
        await queryRunner.query(`DROP TABLE "frontend_app"`);
        await queryRunner.query(`DROP TABLE "browser_metric"`);
    }

}
