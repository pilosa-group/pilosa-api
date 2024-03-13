import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1710347175182 implements MigrationInterface {
    name = 'Migrations1710347175182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "snippet_config" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "batchWaitTime" integer NOT NULL, CONSTRAINT "PK_55d6b563b8ca4464fa9ccd4601c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "urls" text NOT NULL, "snippetConfigId" uuid, CONSTRAINT "REL_bc0711a828ca5599bd9c5441c6" UNIQUE ("snippetConfigId"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_bc0711a828ca5599bd9c5441c6f" FOREIGN KEY ("snippetConfigId") REFERENCES "snippet_config"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_bc0711a828ca5599bd9c5441c6f"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "snippet_config"`);
    }

}
