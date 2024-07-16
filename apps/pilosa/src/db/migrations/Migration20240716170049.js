'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20240716170049 extends Migration {

  async up() {
    this.addSql('alter table "project" drop constraint "project_slug_unique";');
    this.addSql('alter table "project" drop column "slug";');
  }

  async down() {
    this.addSql('alter table "project" add column "slug" varchar(255) not null;');
    this.addSql('alter table "project" add constraint "project_slug_unique" unique ("slug");');
  }

}
exports.Migration20240716170049 = Migration20240716170049;
