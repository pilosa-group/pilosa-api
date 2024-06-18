import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1714056662717 implements MigrationInterface {
  name = 'Migrations1714056662717';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "client" RENAME TO "project"`);
    await queryRunner.query(
      `ALTER TABLE "cloud_provider_account" RENAME COLUMN "clientId" TO "projectId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "frontend_app" RENAME COLUMN "clientId" TO "projectId"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "client" RENAME TO "project"`);
    await queryRunner.query(
      `ALTER TABLE "cloud_provider_account" RENAME COLUMN "projectId" TO "clientId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "frontend_app" RENAME COLUMN "projectId" TO "clientId"`,
    );
  }
}
