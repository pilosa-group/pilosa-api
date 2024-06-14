import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1717086129143 implements MigrationInterface {
  name = 'Migrations1717086129143';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "browser_metric" ADD "firstLoad" boolean DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "browser_metric" ALTER COLUMN "bytesCompressed" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "browser_metric" ALTER COLUMN "bytesCompressed" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "browser_metric" DROP COLUMN "firstLoad"`,
    );
  }
}
