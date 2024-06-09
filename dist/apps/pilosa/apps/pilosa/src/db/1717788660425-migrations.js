"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1717788660425 = void 0;
class Migrations1717788660425 {
    constructor() {
        this.name = 'Migrations1717788660425';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."browser_metric_colorscheme_enum" AS ENUM('dark', 'light')`);
        await queryRunner.query(`ALTER TABLE "browser_metric" ADD "colorScheme" "public"."browser_metric_colorscheme_enum" NOT NULL DEFAULT 'light'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "browser_metric" DROP COLUMN "colorScheme"`);
        await queryRunner.query(`DROP TYPE "public"."browser_metric_colorscheme_enum"`);
    }
}
exports.Migrations1717788660425 = Migrations1717788660425;
//# sourceMappingURL=1717788660425-migrations.js.map