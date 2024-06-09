"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const typeorm_1 = require("typeorm");
const dataSource = core_1.NestFactory.create(app_module_1.AppModule)
    .then((app) => app.get(typeorm_1.DataSource))
    .then((dataSource) => Promise.all([dataSource, dataSource.destroy()]))
    .then(([dataSource]) => dataSource);
exports.default = dataSource;
//# sourceMappingURL=typeorm.datasource.js.map