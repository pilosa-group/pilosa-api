"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1714146963094 = void 0;
class Migrations1714146963094 {
    constructor() {
        this.name = 'Migrations1714146963094';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "project_to_user" DROP COLUMN "organizationId"`);
        await queryRunner.query(`ALTER TABLE "project_to_user" DROP CONSTRAINT "FK_932714e72967e90c085ab35552c"`);
        await queryRunner.query(`ALTER TABLE "project_to_user" ALTER COLUMN "projectId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project_to_user" ADD CONSTRAINT "FK_932714e72967e90c085ab35552c" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "project_to_user" DROP CONSTRAINT "FK_932714e72967e90c085ab35552c"`);
        await queryRunner.query(`ALTER TABLE "project_to_user" ALTER COLUMN "projectId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project_to_user" ADD CONSTRAINT "FK_932714e72967e90c085ab35552c" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_to_user" ADD "organizationId" integer NOT NULL`);
    }
}
exports.Migrations1714146963094 = Migrations1714146963094;
//# sourceMappingURL=1714146963094-migrations.js.map