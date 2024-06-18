import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1718231839923 implements MigrationInterface {
  name = 'Migrations1718231839923';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "browser_metric_asset_group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL DEFAULT 'other', "bytesUncompressed" double precision NOT NULL DEFAULT '0', "bytesCompressed" double precision NOT NULL DEFAULT '0', "cdnPercentage" double precision NOT NULL DEFAULT '0', "cachePercentage" double precision NOT NULL DEFAULT '0', "numberOfRequests" integer NOT NULL DEFAULT '0', "pathId" uuid, "domainId" uuid, CONSTRAINT "PK_5b49bf69ecbd68f8afd8d7ab74c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "browser_metric_path" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "path" character varying NOT NULL, "domReadyTime" double precision NOT NULL DEFAULT '0', "loadTime" double precision NOT NULL DEFAULT '0', "networkIdleTime" double precision NOT NULL DEFAULT '0', "domainId" uuid, CONSTRAINT "PK_688061f395b8e14a9bc3a935ef8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "browser_metric_domain" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "domain" character varying NOT NULL, "isGreenHost" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_e35977fdf76d251fbb7e2e9970a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "browser_metric_asset_group" ADD CONSTRAINT "FK_ffcb67b139989441768348b271f" FOREIGN KEY ("pathId") REFERENCES "browser_metric_path"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "browser_metric_asset_group" ADD CONSTRAINT "FK_3bf4c2da0fb23f9448fd6980240" FOREIGN KEY ("domainId") REFERENCES "browser_metric_domain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "browser_metric_path" ADD CONSTRAINT "FK_5706f864bc4aaa9f36cca5854b8" FOREIGN KEY ("domainId") REFERENCES "browser_metric_domain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "browser_metric_path" DROP CONSTRAINT "FK_5706f864bc4aaa9f36cca5854b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "browser_metric_asset_group" DROP CONSTRAINT "FK_3bf4c2da0fb23f9448fd6980240"`,
    );
    await queryRunner.query(
      `ALTER TABLE "browser_metric_asset_group" DROP CONSTRAINT "FK_ffcb67b139989441768348b271f"`,
    );
    await queryRunner.query(`DROP TABLE "browser_metric_domain"`);
    await queryRunner.query(`DROP TABLE "browser_metric_path"`);
    await queryRunner.query(`DROP TABLE "browser_metric_asset_group"`);
  }
}
