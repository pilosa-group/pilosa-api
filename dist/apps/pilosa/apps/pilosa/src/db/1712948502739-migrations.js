"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1712948502739 = void 0;
class Migrations1712948502739 {
    constructor() {
        this.name = 'Migrations1712948502739';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "clerkId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_59318cd1fa4b0f8fdea9232d041" UNIQUE ("clerkId")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_59318cd1fa4b0f8fdea9232d041"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "clerkId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`);
    }
}
exports.Migrations1712948502739 = Migrations1712948502739;
//# sourceMappingURL=1712948502739-migrations.js.map