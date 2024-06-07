import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1717578558643 implements MigrationInterface {
  name = 'Migrations1717578558643';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "browser_metric" RENAME COLUMN "ip" TO "visitor"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "browser_metric" RENAME COLUMN "visitor" TO "ip"`,
    );
  }
}
