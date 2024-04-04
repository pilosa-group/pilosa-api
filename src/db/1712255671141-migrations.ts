import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1712255671141 implements MigrationInterface {
    name = 'Migrations1712255671141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "server_metric" DROP CONSTRAINT "FK_7226fdf2c2f2273d338a318040b"`);
        await queryRunner.query(`ALTER TABLE "server_metric" DROP CONSTRAINT "REL_7226fdf2c2f2273d338a318040"`);
        await queryRunner.query(`ALTER TABLE "server_metric" ADD CONSTRAINT "FK_7226fdf2c2f2273d338a318040b" FOREIGN KEY ("serverInstanceId") REFERENCES "server_instance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "server_metric" DROP CONSTRAINT "FK_7226fdf2c2f2273d338a318040b"`);
        await queryRunner.query(`ALTER TABLE "server_metric" ADD CONSTRAINT "REL_7226fdf2c2f2273d338a318040" UNIQUE ("serverInstanceId")`);
        await queryRunner.query(`ALTER TABLE "server_metric" ADD CONSTRAINT "FK_7226fdf2c2f2273d338a318040b" FOREIGN KEY ("serverInstanceId") REFERENCES "server_instance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
