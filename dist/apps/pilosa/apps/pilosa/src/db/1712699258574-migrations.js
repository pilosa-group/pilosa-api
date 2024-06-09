"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1712699258574 = void 0;
class Migrations1712699258574 {
    constructor() {
        this.name = 'Migrations1712699258574';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }
}
exports.Migrations1712699258574 = Migrations1712699258574;
//# sourceMappingURL=1712699258574-migrations.js.map