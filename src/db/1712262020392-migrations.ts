import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1712262020392 implements MigrationInterface {
  name = 'Migrations1712262020392';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "server_instance" DROP COLUMN "instanceClass"`,
    );
    await queryRunner.query(
      `ALTER TABLE "server_instance" DROP COLUMN "instanceState"`,
    );
    await queryRunner.query(
      `ALTER TABLE "server_instance" ADD "class" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "server_instance" ADD "state" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "server_instance" DROP COLUMN "state"`,
    );
    await queryRunner.query(
      `ALTER TABLE "server_instance" DROP COLUMN "class"`,
    );
    await queryRunner.query(
      `ALTER TABLE "server_instance" ADD "instanceState" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "server_instance" ADD "instanceClass" character varying NOT NULL`,
    );
  }
}
