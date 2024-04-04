import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1712257825640 implements MigrationInterface {
    name = 'Migrations1712257825640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "server_instance" ADD "tags" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "server_instance" DROP COLUMN "tags"`);
    }

}
