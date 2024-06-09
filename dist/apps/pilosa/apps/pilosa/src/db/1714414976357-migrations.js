"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1714414976357 = void 0;
class Migrations1714414976357 {
    constructor() {
        this.name = 'Migrations1714414976357';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "organization_to_user" RENAME COLUMN "role" TO "roles"`);
        await queryRunner.query(`ALTER TABLE "project_to_user" RENAME COLUMN "role" TO "roles"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "project_to_user" RENAME COLUMN "roles" TO "role"`);
        await queryRunner.query(`ALTER TABLE "organization_to_user" RENAME COLUMN "roles" TO "role"`);
    }
}
exports.Migrations1714414976357 = Migrations1714414976357;
//# sourceMappingURL=1714414976357-migrations.js.map