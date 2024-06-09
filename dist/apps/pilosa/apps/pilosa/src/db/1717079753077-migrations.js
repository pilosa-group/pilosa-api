"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1717079753077 = void 0;
class Migrations1717079753077 {
    constructor() {
        this.name = 'Migrations1717079753077';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "browser_metric_cross_origin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "domain" character varying NOT NULL, "frontendAppId" uuid, CONSTRAINT "PK_4ad6154d3bfb84325a6c3531046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "browser_metric" DROP COLUMN "bytesCached"`);
        await queryRunner.query(`ALTER TABLE "browser_metric" DROP COLUMN "accuracy"`);
        await queryRunner.query(`ALTER TABLE "browser_metric" ADD "initiatorType" character varying`);
        await queryRunner.query(`ALTER TABLE "browser_metric" ADD "extension" character varying`);
        await queryRunner.query(`ALTER TABLE "organization_to_user" ALTER COLUMN "roles" TYPE TEXT`);
        await queryRunner.query(`ALTER TABLE "project_to_user" ALTER COLUMN "roles" TYPE TEXT`);
        await queryRunner.query(`ALTER TABLE "browser_metric_cross_origin" ADD CONSTRAINT "FK_d6414cdb710967f5eef0a913357" FOREIGN KEY ("frontendAppId") REFERENCES "frontend_app"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "browser_metric_cross_origin" DROP CONSTRAINT "FK_d6414cdb710967f5eef0a913357"`);
        await queryRunner.query(`ALTER TABLE "project_to_user" ALTER COLUMN "roles" TYPE character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organization_to_user" ALTER COLUMN "roles" TYPE character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "browser_metric" DROP COLUMN "extension"`);
        await queryRunner.query(`ALTER TABLE "browser_metric" DROP COLUMN "initiatorType"`);
        await queryRunner.query(`ALTER TABLE "browser_metric" ADD "accuracy" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "browser_metric" ADD "bytesCached" double precision NOT NULL`);
        await queryRunner.query(`DROP TABLE "browser_metric_cross_origin"`);
    }
}
exports.Migrations1717079753077 = Migrations1717079753077;
//# sourceMappingURL=1717079753077-migrations.js.map