import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1712254496109 implements MigrationInterface {
    name = 'Migrations1712254496109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "server_instance" DROP CONSTRAINT "FK_160bcaa4aa232fd63d29b91d23a"`);
        await queryRunner.query(`ALTER TABLE "server_instance" DROP CONSTRAINT "REL_160bcaa4aa232fd63d29b91d23"`);
        await queryRunner.query(`ALTER TABLE "cloud_provider_account" DROP CONSTRAINT "FK_8febacd4dbc27c9ca5d0e8269b9"`);
        await queryRunner.query(`ALTER TABLE "cloud_provider_account" DROP CONSTRAINT "REL_8febacd4dbc27c9ca5d0e8269b"`);
        await queryRunner.query(`ALTER TABLE "server_instance" ADD CONSTRAINT "FK_160bcaa4aa232fd63d29b91d23a" FOREIGN KEY ("cloudProviderAccountId") REFERENCES "cloud_provider_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cloud_provider_account" ADD CONSTRAINT "FK_8febacd4dbc27c9ca5d0e8269b9" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cloud_provider_account" DROP CONSTRAINT "FK_8febacd4dbc27c9ca5d0e8269b9"`);
        await queryRunner.query(`ALTER TABLE "server_instance" DROP CONSTRAINT "FK_160bcaa4aa232fd63d29b91d23a"`);
        await queryRunner.query(`ALTER TABLE "cloud_provider_account" ADD CONSTRAINT "REL_8febacd4dbc27c9ca5d0e8269b" UNIQUE ("clientId")`);
        await queryRunner.query(`ALTER TABLE "cloud_provider_account" ADD CONSTRAINT "FK_8febacd4dbc27c9ca5d0e8269b9" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "server_instance" ADD CONSTRAINT "REL_160bcaa4aa232fd63d29b91d23" UNIQUE ("cloudProviderAccountId")`);
        await queryRunner.query(`ALTER TABLE "server_instance" ADD CONSTRAINT "FK_160bcaa4aa232fd63d29b91d23a" FOREIGN KEY ("cloudProviderAccountId") REFERENCES "cloud_provider_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
