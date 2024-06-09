"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const project_1 = require("../../../libs/project/src");
const validation_schema_1 = require("./config/validation.schema");
const configuration_1 = require("./config/configuration");
const typeorm_1 = require("@nestjs/typeorm");
const web_snippet_module_1 = require("./web-snippet/web-snippet.module");
const cloud_aws_1 = require("../../../libs/cloud-aws/src");
const cloud_1 = require("../../../libs/cloud/src");
const web_metrics_1 = require("../../../libs/web-metrics/src");
const frontend_app_entity_1 = require("../../../libs/web-metrics/src/entities/frontend-app.entity");
const browser_metric_entity_1 = require("../../../libs/web-metrics/src/entities/browser-metric.entity");
const cloud_metrics_1 = require("../../../libs/cloud-metrics/src");
const server_metric_entity_1 = require("../../../libs/cloud-metrics/src/entities/server-metric.entity");
const cloud_provider_account_entity_1 = require("../../../libs/cloud/src/entities/cloud-provider-account.entity");
const service_instance_entity_1 = require("../../../libs/cloud/src/entities/service-instance.entity");
const health_1 = require("../../../libs/health/src");
const auth_1 = require("../../../libs/auth/src");
const user_1 = require("../../../libs/user/src");
const user_entity_1 = require("../../../libs/user/src/entities/user.entity");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("../../../libs/auth/src/guards/jwt-auth.guard");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const path = require("path");
const organization_entity_1 = require("../../../libs/project/src/entities/organization.entity");
const user_organization_role_entity_1 = require("../../../libs/project/src/entities/user-organization-role.entity");
const user_project_role_entity_1 = require("../../../libs/project/src/entities/user-project-role.entity");
const project_entity_1 = require("../../../libs/project/src/entities/project.entity");
const metrics_1 = require("../../../libs/metrics/src");
const browser_metric_cross_origin_entity_1 = require("../../../libs/web-metrics/src/entities/browser-metric-cross-origin.entity");
const synthetic_scan_1 = require("../../../libs/synthetic-scan/src");
const cache_manager_1 = require("@nestjs/cache-manager");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
        imports: [
            cache_manager_1.CacheModule.register({
                isGlobal: true,
            }),
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                validationSchema: validation_schema_1.validationSchema,
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
                allowBatchedHttpRequests: true,
                sortSchema: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    const { port, host, database, username, password, ssl } = configService.get('database');
                    return {
                        type: 'postgres',
                        host,
                        port,
                        username,
                        password,
                        database,
                        ssl,
                        entities: [
                            browser_metric_entity_1.BrowserMetric,
                            browser_metric_cross_origin_entity_1.BrowserMetricCrossOrigin,
                            cloud_provider_account_entity_1.CloudProviderAccount,
                            frontend_app_entity_1.FrontendApp,
                            organization_entity_1.Organization,
                            project_entity_1.Project,
                            service_instance_entity_1.ServerInstance,
                            server_metric_entity_1.ServerMetric,
                            user_entity_1.User,
                            user_organization_role_entity_1.UserOrganizationRole,
                            user_project_role_entity_1.UserProjectRole,
                        ],
                        migrations: ['dist/apps/pilosa/apps/pilosa/src/db/*-migrations.js'],
                        cli: {
                            migrationsDir: 'src/db/migrations',
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
            auth_1.AuthModule,
            project_1.ProjectModule,
            web_metrics_1.WebMetricsModule,
            metrics_1.MetricsModule,
            cloud_metrics_1.CloudMetricsModule,
            cloud_1.CloudModule,
            cloud_aws_1.CloudAwsModule,
            user_1.UserModule,
            web_snippet_module_1.WebSnippetModule,
            health_1.HealthModule,
            synthetic_scan_1.SyntheticScanModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map