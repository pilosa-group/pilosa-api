"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserMetric = void 0;
const typeorm_1 = require("typeorm");
const frontend_app_entity_1 = require("./frontend-app.entity");
const graphql_1 = require("@nestjs/graphql");
const type_1 = require("graphql/type");
let BrowserMetric = class BrowserMetric {
    constructor() {
        this.colorScheme = 'light';
    }
};
exports.BrowserMetric = BrowserMetric;
__decorate([
    (0, typeorm_1.PrimaryColumn)('timestamptz', {
        default: () => 'CURRENT_TIMESTAMP',
    }),
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], BrowserMetric.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], BrowserMetric.prototype, "firstLoad", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-enum', {
        enum: ['dark', 'light'],
        default: 'light',
    }),
    __metadata("design:type", String)
], BrowserMetric.prototype, "colorScheme", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BrowserMetric.prototype, "domain", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BrowserMetric.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BrowserMetric.prototype, "initiatorType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BrowserMetric.prototype, "extension", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    (0, graphql_1.Field)(() => type_1.GraphQLFloat),
    __metadata("design:type", Number)
], BrowserMetric.prototype, "bytesCompressed", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    (0, graphql_1.Field)(() => type_1.GraphQLFloat),
    __metadata("design:type", Number)
], BrowserMetric.prototype, "bytesUncompressed", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BrowserMetric.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BrowserMetric.prototype, "visitor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => frontend_app_entity_1.FrontendApp, (frontendApp) => frontendApp.metrics),
    (0, typeorm_1.JoinColumn)(),
    (0, graphql_1.Field)(() => frontend_app_entity_1.FrontendApp),
    __metadata("design:type", frontend_app_entity_1.FrontendApp)
], BrowserMetric.prototype, "frontendApp", void 0);
exports.BrowserMetric = BrowserMetric = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], BrowserMetric);
//# sourceMappingURL=browser-metric.entity.js.map