'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20240710214538 extends Migration {

  async up() {
    this.addSql('alter table "user" add column "email" varchar(255) null, add column "name" varchar(255) null;');
  }

  async down() {
    this.addSql('alter table "user" drop column "email", drop column "name";');
  }

}
exports.Migration20240710214538 = Migration20240710214538;
