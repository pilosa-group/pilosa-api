"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1714146900664 = void 0;
class Migrations1714146900664 {
    constructor() {
        this.name = 'Migrations1714146900664';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "project_to_user" DROP CONSTRAINT "PK_f14510443b767012ccdaf06b843"`);
        await queryRunner.query(`ALTER TABLE "project_to_user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "project_to_user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "project_to_user" ADD CONSTRAINT "PK_f14510443b767012ccdaf06b843" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "organization_to_user" DROP CONSTRAINT "PK_5eed530654f1a9aacad0979ec4e"`);
        await queryRunner.query(`ALTER TABLE "organization_to_user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "organization_to_user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "organization_to_user" ADD CONSTRAINT "PK_5eed530654f1a9aacad0979ec4e" PRIMARY KEY ("id")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "organization_to_user" DROP CONSTRAINT "PK_5eed530654f1a9aacad0979ec4e"`);
        await queryRunner.query(`ALTER TABLE "organization_to_user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "organization_to_user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organization_to_user" ADD CONSTRAINT "PK_5eed530654f1a9aacad0979ec4e" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "project_to_user" DROP CONSTRAINT "PK_f14510443b767012ccdaf06b843"`);
        await queryRunner.query(`ALTER TABLE "project_to_user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "project_to_user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project_to_user" ADD CONSTRAINT "PK_f14510443b767012ccdaf06b843" PRIMARY KEY ("id")`);
    }
}
exports.Migrations1714146900664 = Migrations1714146900664;
//# sourceMappingURL=1714146900664-migrations.js.map