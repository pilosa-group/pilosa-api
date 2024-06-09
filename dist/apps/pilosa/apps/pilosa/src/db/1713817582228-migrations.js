"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1713817582228 = void 0;
class Migrations1713817582228 {
    constructor() {
        this.name = 'Migrations1713817582228';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "browser_metric" ADD "ip" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "browser_metric" DROP COLUMN "ip"`);
    }
}
exports.Migrations1713817582228 = Migrations1713817582228;
//# sourceMappingURL=1713817582228-migrations.js.map