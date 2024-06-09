"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1714056662717 = void 0;
class Migrations1714056662717 {
    constructor() {
        this.name = 'Migrations1714056662717';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "client" RENAME TO "project"`);
        await queryRunner.query(`ALTER TABLE "cloud_provider_account" RENAME COLUMN "clientId" TO "projectId"`);
        await queryRunner.query(`ALTER TABLE "frontend_app" RENAME COLUMN "clientId" TO "projectId"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "client" RENAME TO "project"`);
        await queryRunner.query(`ALTER TABLE "cloud_provider_account" RENAME COLUMN "projectId" TO "clientId"`);
        await queryRunner.query(`ALTER TABLE "frontend_app" RENAME COLUMN "projectId" TO "clientId"`);
    }
}
exports.Migrations1714056662717 = Migrations1714056662717;
//# sourceMappingURL=1714056662717-migrations.js.map