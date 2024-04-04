import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1712255613194 implements MigrationInterface {
    name = 'Migrations1712255613194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "server_metric" ALTER COLUMN "networkIn" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "server_metric" ALTER COLUMN "networkOut" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "server_metric" ALTER COLUMN "networkOut" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "server_metric" ALTER COLUMN "networkIn" SET NOT NULL`);
    }

}
