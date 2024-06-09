"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1717086129143 = void 0;
class Migrations1717086129143 {
    constructor() {
        this.name = 'Migrations1717086129143';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "browser_metric" ADD "firstLoad" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "browser_metric" ALTER COLUMN "bytesCompressed" DROP DEFAULT`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "browser_metric" ALTER COLUMN "bytesCompressed" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "browser_metric" DROP COLUMN "firstLoad"`);
    }
}
exports.Migrations1717086129143 = Migrations1717086129143;
//# sourceMappingURL=1717086129143-migrations.js.map