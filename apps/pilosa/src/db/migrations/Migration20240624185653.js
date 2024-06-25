'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20240624185653 extends Migration {
  async up() {
    this.addSql(
      'alter table "asset_group_statistics" alter column "bytesUncompressed" type int using ("bytesUncompressed"::int);',
    );
    this.addSql(
      'alter table "asset_group_statistics" alter column "bytesCompressed" type int using ("bytesCompressed"::int);',
    );

    this.addSql(
      'alter table "browser_metric" add column "pageLoaded" boolean null;',
    );
    this.addSql(
      'alter table "browser_metric" alter column "firstLoad" type boolean using ("firstLoad"::boolean);',
    );
    this.addSql(
      'alter table "browser_metric" alter column "firstLoad" drop not null;',
    );
  }

  async down() {
    this.addSql(
      'alter table "asset_group_statistics" alter column "bytesUncompressed" type float4 using ("bytesUncompressed"::float4);',
    );
    this.addSql(
      'alter table "asset_group_statistics" alter column "bytesCompressed" type float4 using ("bytesCompressed"::float4);',
    );

    this.addSql('alter table "browser_metric" drop column "pageLoaded";');

    this.addSql(
      'alter table "browser_metric" alter column "firstLoad" type bool using ("firstLoad"::bool);',
    );
    this.addSql(
      'alter table "browser_metric" alter column "firstLoad" set not null;',
    );
  }
}
exports.Migration20240624185653 = Migration20240624185653;
