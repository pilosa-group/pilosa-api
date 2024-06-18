import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1714146900664 implements MigrationInterface {
  name = 'Migrations1714146900664';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_to_user" DROP CONSTRAINT "PK_f14510443b767012ccdaf06b843"`,
    );
    await queryRunner.query(`ALTER TABLE "project_to_user" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "project_to_user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_to_user" ADD CONSTRAINT "PK_f14510443b767012ccdaf06b843" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_to_user" DROP CONSTRAINT "PK_5eed530654f1a9aacad0979ec4e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_to_user" DROP COLUMN "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_to_user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_to_user" ADD CONSTRAINT "PK_5eed530654f1a9aacad0979ec4e" PRIMARY KEY ("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization_to_user" DROP CONSTRAINT "PK_5eed530654f1a9aacad0979ec4e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_to_user" DROP COLUMN "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_to_user" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_to_user" ADD CONSTRAINT "PK_5eed530654f1a9aacad0979ec4e" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_to_user" DROP CONSTRAINT "PK_f14510443b767012ccdaf06b843"`,
    );
    await queryRunner.query(`ALTER TABLE "project_to_user" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "project_to_user" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_to_user" ADD CONSTRAINT "PK_f14510443b767012ccdaf06b843" PRIMARY KEY ("id")`,
    );
  }
}
