import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1712257167977 implements MigrationInterface {
    name = 'Migrations1712257167977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "server_metric" ADD "diskReadOps" double precision`);
        await queryRunner.query(`ALTER TABLE "server_metric" ADD "diskWriteOps" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "server_metric" DROP COLUMN "diskWriteOps"`);
        await queryRunner.query(`ALTER TABLE "server_metric" DROP COLUMN "diskReadOps"`);
    }

}
