"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        prefix: 'v',
        defaultVersion: '1',
    });
    app.enableCors({
        origin: '*',
    });
    app.getHttpAdapter().getInstance().set('trust proxy', true);
    app.getHttpAdapter().getInstance().disable('x-powered-by');
    await app.listen(4000);
}
void bootstrap();
//# sourceMappingURL=main.js.map