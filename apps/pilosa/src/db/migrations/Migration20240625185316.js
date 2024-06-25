'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20240625185316 extends Migration {
  async up() {
    this.addSql(
      'create table "browser_metric_path_statistics" ("browserMetric" uuid not null, "pathStatistics" uuid not null, constraint "browser_metric_path_statistics_pkey" primary key ("browserMetric", "pathStatistics"));',
    );

    this.addSql(
      'alter table "browser_metric_path_statistics" add constraint "browser_metric_path_statistics_browserMetric_foreign" foreign key ("browserMetric") references "browser_metric" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "browser_metric_path_statistics" add constraint "browser_metric_path_statistics_pathStatistics_foreign" foreign key ("pathStatistics") references "path_statistics" ("id") on update cascade on delete cascade;',
    );

    this.addSql('alter table "path" drop constraint "path_domain_foreign";');

    this.addSql(
      'alter table "path_statistics" drop constraint "path_statistics_path_domain_path_path_foreign";',
    );

    this.addSql(
      'alter table "asset_group_statistics" drop constraint "asset_group_statistics_domain_foreign";',
    );
    this.addSql(
      'alter table "asset_group_statistics" drop constraint "asset_group_statistics_pathStats_foreign";',
    );

    this.addSql(
      'alter table "project" drop constraint "project_organization_foreign";',
    );

    this.addSql(
      'alter table "frontend_app" drop constraint "frontend_app_project_foreign";',
    );

    this.addSql(
      'alter table "cross_origin" drop constraint "cross_origin_frontendApp_foreign";',
    );

    this.addSql(
      'alter table "browser_metric" drop constraint "browser_metric_frontendApp_foreign";',
    );

    this.addSql(
      'alter table "cloud_provider_account" drop constraint "cloud_provider_account_project_foreign";',
    );

    this.addSql(
      'alter table "server_instance" drop constraint "server_instance_cloudProviderAccount_foreign";',
    );

    this.addSql(
      'alter table "server_metric" drop constraint "server_metric_serverInstance_foreign";',
    );

    this.addSql(
      'alter table "organization_to_user" drop constraint "organization_to_user_organization_foreign";',
    );
    this.addSql(
      'alter table "organization_to_user" drop constraint "organization_to_user_user_foreign";',
    );

    this.addSql(
      'alter table "project_to_user" drop constraint "project_to_user_project_foreign";',
    );
    this.addSql(
      'alter table "project_to_user" drop constraint "project_to_user_user_foreign";',
    );

    this.addSql(
      'alter table "path" add constraint "path_domain_foreign" foreign key ("domain") references "domain" ("fqdn") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "path_statistics" add constraint "path_statistics_path_domain_path_path_foreign" foreign key ("path_domain", "path_path") references "path" ("domain", "path") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "asset_group_statistics" add constraint "asset_group_statistics_domain_foreign" foreign key ("domain") references "domain" ("fqdn") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "asset_group_statistics" add constraint "asset_group_statistics_pathStats_foreign" foreign key ("pathStats") references "path_statistics" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "project" add constraint "project_organization_foreign" foreign key ("organization") references "organization" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "frontend_app" add constraint "frontend_app_project_foreign" foreign key ("project") references "project" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "cross_origin" add constraint "cross_origin_frontendApp_foreign" foreign key ("frontendApp") references "frontend_app" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "browser_metric" add constraint "browser_metric_frontendApp_foreign" foreign key ("frontendApp") references "frontend_app" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "cloud_provider_account" add constraint "cloud_provider_account_project_foreign" foreign key ("project") references "project" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "server_instance" add constraint "server_instance_cloudProviderAccount_foreign" foreign key ("cloudProviderAccount") references "cloud_provider_account" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "server_metric" add constraint "server_metric_serverInstance_foreign" foreign key ("serverInstance") references "server_instance" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "organization_to_user" add constraint "organization_to_user_organization_foreign" foreign key ("organization") references "organization" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "organization_to_user" add constraint "organization_to_user_user_foreign" foreign key ("user") references "user" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "project_to_user" add constraint "project_to_user_project_foreign" foreign key ("project") references "project" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "project_to_user" add constraint "project_to_user_user_foreign" foreign key ("user") references "user" ("id") on update cascade on delete cascade;',
    );
  }

  async down() {
    this.addSql(
      'drop table if exists "browser_metric_path_statistics" cascade;',
    );

    this.addSql(
      'alter table "asset_group_statistics" drop constraint "asset_group_statistics_pathStats_foreign";',
    );
    this.addSql(
      'alter table "asset_group_statistics" drop constraint "asset_group_statistics_domain_foreign";',
    );

    this.addSql(
      'alter table "browser_metric" drop constraint "browser_metric_frontendApp_foreign";',
    );

    this.addSql(
      'alter table "cloud_provider_account" drop constraint "cloud_provider_account_project_foreign";',
    );

    this.addSql(
      'alter table "cross_origin" drop constraint "cross_origin_frontendApp_foreign";',
    );

    this.addSql(
      'alter table "frontend_app" drop constraint "frontend_app_project_foreign";',
    );

    this.addSql(
      'alter table "organization_to_user" drop constraint "organization_to_user_organization_foreign";',
    );
    this.addSql(
      'alter table "organization_to_user" drop constraint "organization_to_user_user_foreign";',
    );

    this.addSql('alter table "path" drop constraint "path_domain_foreign";');

    this.addSql(
      'alter table "path_statistics" drop constraint "path_statistics_path_domain_path_path_foreign";',
    );

    this.addSql(
      'alter table "project" drop constraint "project_organization_foreign";',
    );

    this.addSql(
      'alter table "project_to_user" drop constraint "project_to_user_project_foreign";',
    );
    this.addSql(
      'alter table "project_to_user" drop constraint "project_to_user_user_foreign";',
    );

    this.addSql(
      'alter table "server_instance" drop constraint "server_instance_cloudProviderAccount_foreign";',
    );

    this.addSql(
      'alter table "server_metric" drop constraint "server_metric_serverInstance_foreign";',
    );

    this.addSql(
      'alter table "asset_group_statistics" add constraint "asset_group_statistics_pathStats_foreign" foreign key ("pathStats") references "path_statistics" ("id") on update cascade on delete no action;',
    );
    this.addSql(
      'alter table "asset_group_statistics" add constraint "asset_group_statistics_domain_foreign" foreign key ("domain") references "domain" ("fqdn") on update cascade on delete no action;',
    );

    this.addSql(
      'alter table "browser_metric" add constraint "browser_metric_frontendApp_foreign" foreign key ("frontendApp") references "frontend_app" ("id") on update cascade on delete no action;',
    );

    this.addSql(
      'alter table "cloud_provider_account" add constraint "cloud_provider_account_project_foreign" foreign key ("project") references "project" ("id") on update cascade on delete no action;',
    );

    this.addSql(
      'alter table "cross_origin" add constraint "cross_origin_frontendApp_foreign" foreign key ("frontendApp") references "frontend_app" ("id") on update cascade on delete no action;',
    );

    this.addSql(
      'alter table "frontend_app" add constraint "frontend_app_project_foreign" foreign key ("project") references "project" ("id") on update cascade on delete no action;',
    );

    this.addSql(
      'alter table "organization_to_user" add constraint "organization_to_user_organization_foreign" foreign key ("organization") references "organization" ("id") on update cascade on delete no action;',
    );
    this.addSql(
      'alter table "organization_to_user" add constraint "organization_to_user_user_foreign" foreign key ("user") references "user" ("id") on update cascade on delete no action;',
    );

    this.addSql(
      'alter table "path" add constraint "path_domain_foreign" foreign key ("domain") references "domain" ("fqdn") on update cascade on delete no action;',
    );

    this.addSql(
      'alter table "path_statistics" add constraint "path_statistics_path_domain_path_path_foreign" foreign key ("path_domain", "path_path") references "path" ("domain", "path") on update cascade on delete no action;',
    );

    this.addSql(
      'alter table "project" add constraint "project_organization_foreign" foreign key ("organization") references "organization" ("id") on update cascade on delete no action;',
    );

    this.addSql(
      'alter table "project_to_user" add constraint "project_to_user_project_foreign" foreign key ("project") references "project" ("id") on update cascade on delete no action;',
    );
    this.addSql(
      'alter table "project_to_user" add constraint "project_to_user_user_foreign" foreign key ("user") references "user" ("id") on update cascade on delete no action;',
    );

    this.addSql(
      'alter table "server_instance" add constraint "server_instance_cloudProviderAccount_foreign" foreign key ("cloudProviderAccount") references "cloud_provider_account" ("id") on update cascade on delete no action;',
    );

    this.addSql(
      'alter table "server_metric" add constraint "server_metric_serverInstance_foreign" foreign key ("serverInstance") references "server_instance" ("id") on update cascade on delete no action;',
    );
  }
}
exports.Migration20240625185316 = Migration20240625185316;
