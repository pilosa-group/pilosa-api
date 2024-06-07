import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1710356705355 implements MigrationInterface {
    name = 'Migrations1710356705355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_bc0711a828ca5599bd9c5441c6f"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_e9496b6c10fe49e94d4ecc27abd"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "REL_bc0711a828ca5599bd9c5441c6"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "snippetConfigId"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "UQ_e9496b6c10fe49e94d4ecc27abd"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "awsCredentialsId"`);
        await queryRunner.query(`ALTER TABLE "snippet_config" ADD "clientId" uuid`);
        await queryRunner.query(`ALTER TABLE "snippet_config" ADD CONSTRAINT "UQ_a137e7d06d28898bb238937efea" UNIQUE ("clientId")`);
        await queryRunner.query(`ALTER TABLE "aws_credentials" ADD "clientId" uuid`);
        await queryRunner.query(`ALTER TABLE "aws_credentials" ADD CONSTRAINT "UQ_52b08794e94ac9052b0b01a0c10" UNIQUE ("clientId")`);
        await queryRunner.query(`ALTER TABLE "snippet_config" ADD CONSTRAINT "FK_a137e7d06d28898bb238937efea" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "aws_credentials" ADD CONSTRAINT "FK_52b08794e94ac9052b0b01a0c10" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aws_credentials" DROP CONSTRAINT "FK_52b08794e94ac9052b0b01a0c10"`);
        await queryRunner.query(`ALTER TABLE "snippet_config" DROP CONSTRAINT "FK_a137e7d06d28898bb238937efea"`);
        await queryRunner.query(`ALTER TABLE "aws_credentials" DROP CONSTRAINT "UQ_52b08794e94ac9052b0b01a0c10"`);
        await queryRunner.query(`ALTER TABLE "aws_credentials" DROP COLUMN "clientId"`);
        await queryRunner.query(`ALTER TABLE "snippet_config" DROP CONSTRAINT "UQ_a137e7d06d28898bb238937efea"`);
        await queryRunner.query(`ALTER TABLE "snippet_config" DROP COLUMN "clientId"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "awsCredentialsId" uuid`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "UQ_e9496b6c10fe49e94d4ecc27abd" UNIQUE ("awsCredentialsId")`);
        await queryRunner.query(`ALTER TABLE "client" ADD "snippetConfigId" uuid`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "REL_bc0711a828ca5599bd9c5441c6" UNIQUE ("snippetConfigId")`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_e9496b6c10fe49e94d4ecc27abd" FOREIGN KEY ("awsCredentialsId") REFERENCES "aws_credentials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_bc0711a828ca5599bd9c5441c6f" FOREIGN KEY ("snippetConfigId") REFERENCES "snippet_config"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
