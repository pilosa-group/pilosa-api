"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1717094542286 = void 0;
class Migrations1717094542286 {
    constructor() {
        this.name = 'Migrations1717094542286';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "browser_metric" ALTER COLUMN "firstLoad" SET NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "browser_metric" ALTER COLUMN "firstLoad" DROP NOT NULL`);
    }
}
exports.Migrations1717094542286 = Migrations1717094542286;
//# sourceMappingURL=1717094542286-migrations.js.map