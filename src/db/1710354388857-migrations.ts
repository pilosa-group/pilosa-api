import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1710354388857 implements MigrationInterface {
    name = 'Migrations1710354388857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "aws_credentials" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "accessKeyId" character varying NOT NULL, "secretAccessKey" character varying NOT NULL, "region" character varying NOT NULL, CONSTRAINT "PK_dd50eeb7ab9f2b49389ecd659f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "client" ADD "awsCredentialsId" uuid`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "UQ_e9496b6c10fe49e94d4ecc27abd" UNIQUE ("awsCredentialsId")`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_e9496b6c10fe49e94d4ecc27abd" FOREIGN KEY ("awsCredentialsId") REFERENCES "aws_credentials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_e9496b6c10fe49e94d4ecc27abd"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "UQ_e9496b6c10fe49e94d4ecc27abd"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "awsCredentialsId"`);
        await queryRunner.query(`DROP TABLE "aws_credentials"`);
    }

}
