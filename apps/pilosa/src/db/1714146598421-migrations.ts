import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1714146598421 implements MigrationInterface {
    name = 'Migrations1714146598421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "frontend_app" DROP CONSTRAINT "FK_3519d03545c53c7aa9cc29ca133"`);
        await queryRunner.query(`ALTER TABLE "cloud_provider_account" DROP CONSTRAINT "FK_8febacd4dbc27c9ca5d0e8269b9"`);
        await queryRunner.query(`CREATE TABLE "project_to_user" ("id" SERIAL NOT NULL, "organizationId" integer NOT NULL, "userId" uuid NOT NULL, "role" character varying NOT NULL, "projectId" uuid, CONSTRAINT "PK_f14510443b767012ccdaf06b843" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organization_to_user" ("id" SERIAL NOT NULL, "organizationId" uuid NOT NULL, "userId" uuid NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_5eed530654f1a9aacad0979ec4e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "project" ADD "organizationId" uuid`);
        await queryRunner.query(`ALTER TABLE "frontend_app" ADD CONSTRAINT "FK_1b88af8a53f53f4bf514f7ad76d" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cloud_provider_account" ADD CONSTRAINT "FK_6e638415a214a695c850af95864" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_to_user" ADD CONSTRAINT "FK_932714e72967e90c085ab35552c" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_to_user" ADD CONSTRAINT "FK_39fe950a39abd407ec7c5e8da29" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organization_to_user" ADD CONSTRAINT "FK_2e41eb0e38e367b881def5e4468" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organization_to_user" ADD CONSTRAINT "FK_00df556fdb9d8159df916ce3dcd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_0028dfadf312a1d7f51656c4a9a" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_0028dfadf312a1d7f51656c4a9a"`);
        await queryRunner.query(`ALTER TABLE "organization_to_user" DROP CONSTRAINT "FK_00df556fdb9d8159df916ce3dcd"`);
        await queryRunner.query(`ALTER TABLE "organization_to_user" DROP CONSTRAINT "FK_2e41eb0e38e367b881def5e4468"`);
        await queryRunner.query(`ALTER TABLE "project_to_user" DROP CONSTRAINT "FK_39fe950a39abd407ec7c5e8da29"`);
        await queryRunner.query(`ALTER TABLE "project_to_user" DROP CONSTRAINT "FK_932714e72967e90c085ab35552c"`);
        await queryRunner.query(`ALTER TABLE "cloud_provider_account" DROP CONSTRAINT "FK_6e638415a214a695c850af95864"`);
        await queryRunner.query(`ALTER TABLE "frontend_app" DROP CONSTRAINT "FK_1b88af8a53f53f4bf514f7ad76d"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "organizationId"`);
        await queryRunner.query(`DROP TABLE "organization"`);
        await queryRunner.query(`DROP TABLE "organization_to_user"`);
        await queryRunner.query(`DROP TABLE "project_to_user"`);
        await queryRunner.query(`ALTER TABLE "cloud_provider_account" ADD CONSTRAINT "FK_8febacd4dbc27c9ca5d0e8269b9" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "frontend_app" ADD CONSTRAINT "FK_3519d03545c53c7aa9cc29ca133" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
