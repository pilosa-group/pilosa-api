import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1717080602435 implements MigrationInterface {
  name = 'Migrations1717080602435';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "browser_metric" RENAME COLUMN "bytes" TO "bytesUncompressed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "browser_metric" ADD "bytesCompressed" double precision NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "browser_metric" RENAME COLUMN "bytesUncompressed" TO "bytes"`,
    );
    await queryRunner.query(
      `ALTER TABLE "browser_metric" DROP COLUMN "bytesCompressed"`,
    );
  }
}
