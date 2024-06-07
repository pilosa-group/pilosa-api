import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1714414976357 implements MigrationInterface {
  name = 'Migrations1714414976357';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization_to_user" RENAME COLUMN "role" TO "roles"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_to_user" RENAME COLUMN "role" TO "roles"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_to_user" RENAME COLUMN "roles" TO "role"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_to_user" RENAME COLUMN "roles" TO "role"`,
    );
  }
}
