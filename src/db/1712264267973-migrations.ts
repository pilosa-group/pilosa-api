import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1712264267973 implements MigrationInterface {
    name = 'Migrations1712264267973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "urls"`);
        await queryRunner.query(`ALTER TABLE "frontend_app" ADD "urls" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "frontend_app" DROP COLUMN "urls"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "urls" text NOT NULL`);
    }

}
