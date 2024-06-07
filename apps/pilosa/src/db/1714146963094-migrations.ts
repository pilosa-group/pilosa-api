import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1714146963094 implements MigrationInterface {
    name = 'Migrations1714146963094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_to_user" DROP COLUMN "organizationId"`);
        await queryRunner.query(`ALTER TABLE "project_to_user" DROP CONSTRAINT "FK_932714e72967e90c085ab35552c"`);
        await queryRunner.query(`ALTER TABLE "project_to_user" ALTER COLUMN "projectId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project_to_user" ADD CONSTRAINT "FK_932714e72967e90c085ab35552c" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_to_user" DROP CONSTRAINT "FK_932714e72967e90c085ab35552c"`);
        await queryRunner.query(`ALTER TABLE "project_to_user" ALTER COLUMN "projectId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project_to_user" ADD CONSTRAINT "FK_932714e72967e90c085ab35552c" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_to_user" ADD "organizationId" integer NOT NULL`);
    }

}
