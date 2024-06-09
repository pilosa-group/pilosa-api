"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1717080602435 = void 0;
class Migrations1717080602435 {
    constructor() {
        this.name = 'Migrations1717080602435';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "browser_metric" RENAME COLUMN "bytes" TO "bytesUncompressed"`);
        await queryRunner.query(`ALTER TABLE "browser_metric" ADD "bytesCompressed" double precision NOT NULL DEFAULT 0`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "browser_metric" RENAME COLUMN "bytesUncompressed" TO "bytes"`);
        await queryRunner.query(`ALTER TABLE "browser_metric" DROP COLUMN "bytesCompressed"`);
    }
}
exports.Migrations1717080602435 = Migrations1717080602435;
//# sourceMappingURL=1717080602435-migrations.js.map