import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1717788660425 implements MigrationInterface {
  name = 'Migrations1717788660425';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."browser_metric_colorscheme_enum" AS ENUM('dark', 'light')`,
    );
    await queryRunner.query(
      `ALTER TABLE "browser_metric" ADD "colorScheme" "public"."browser_metric_colorscheme_enum" NOT NULL DEFAULT 'light'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "browser_metric" DROP COLUMN "colorScheme"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."browser_metric_colorscheme_enum"`,
    );
  }
}
