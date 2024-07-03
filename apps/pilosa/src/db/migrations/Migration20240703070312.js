'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20240703070312 extends Migration {
  async up() {
    this.addSql(
      `SELECT create_hypertable('browser_metric', by_range('time'), migrate_data := true);`,
    );

    this.addSql(
      `SELECT create_hypertable('server_metric', by_range('time'), migrate_data := true);`,
    );
  }

  async down() {}
}
exports.Migration20240703070312 = Migration20240703070312;
