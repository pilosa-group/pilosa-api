import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1718013306326 implements MigrationInterface {
  name = 'Migrations1718013306326';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "browser_metric" ADD "device" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "browser_metric" ADD "os" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "browser_metric" ADD "browser" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "browser_metric" ADD "cpu" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "browser_metric" ALTER COLUMN "userAgent" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "browser_metric" ALTER COLUMN "userAgent" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "browser_metric" DROP COLUMN "cpu"`);
    await queryRunner.query(
      `ALTER TABLE "browser_metric" DROP COLUMN "browser"`,
    );
    await queryRunner.query(`ALTER TABLE "browser_metric" DROP COLUMN "os"`);
    await queryRunner.query(
      `ALTER TABLE "browser_metric" DROP COLUMN "device"`,
    );
  }
}
