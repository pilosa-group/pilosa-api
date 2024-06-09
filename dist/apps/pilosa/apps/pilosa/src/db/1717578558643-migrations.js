"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1717578558643 = void 0;
class Migrations1717578558643 {
    constructor() {
        this.name = 'Migrations1717578558643';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "browser_metric" RENAME COLUMN "ip" TO "visitor"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "browser_metric" RENAME COLUMN "visitor" TO "ip"`);
    }
}
exports.Migrations1717578558643 = Migrations1717578558643;
//# sourceMappingURL=1717578558643-migrations.js.map