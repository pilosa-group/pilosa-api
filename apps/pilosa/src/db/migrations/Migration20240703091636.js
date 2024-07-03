'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20240703091636 extends Migration {

  async up() {
    this.addSql('drop index "browser_metric_time_idx";');

    this.addSql('alter table "browser_metric" add column "viewportWidth" int null, add column "viewportHeight" int null;');

    this.addSql('drop index "server_metric_time_idx";');
  }

  async down() {
    this.addSql('alter table "browser_metric" drop column "viewportWidth", drop column "viewportHeight";');

    this.addSql('CREATE INDEX browser_metric_time_idx ON public.browser_metric USING btree ("time" DESC);');

    this.addSql('CREATE INDEX server_metric_time_idx ON public.server_metric USING btree ("time" DESC);');
  }

}
exports.Migration20240703091636 = Migration20240703091636;
