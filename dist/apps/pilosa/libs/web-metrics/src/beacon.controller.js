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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeaconController = void 0;
const common_1 = require("@nestjs/common");
const frontend_app_service_1 = require("./frontend-app.service");
const browser_metric_service_1 = require("./browser-metric.service");
const public_decorator_1 = require("../../auth/src/decorators/public.decorator");
const client_ip_decorator_1 = require("./decorators/client-ip.decorator");
const crypto = require("crypto");
function hashValue(value) {
    const hash = crypto.createHash('sha256');
    hash.update(value);
    return hash.digest('hex');
}
const FRONTEND_APP_ID = 'x-id';
const isValidInitiatorType = (initiatorType) => [
    'audio',
    'beacon',
    'body',
    'css',
    'early-hint',
    'embed',
    'fetch',
    'frame',
    'iframe',
    'icon',
    'image',
    'img',
    'input',
    'link',
    'navigation',
    'object',
    'ping',
    'script',
    'track',
    'video',
    'xmlhttprequest',
].includes(initiatorType);
let BeaconController = class BeaconController {
    constructor(frontendAppService, browserMetricService) {
        this.frontendAppService = frontendAppService;
        this.browserMetricService = browserMetricService;
    }
    async options() {
        return null;
    }
    async create(createBrowserMetricDto, req, clientIp) {
        const frontendAppId = req.headers[FRONTEND_APP_ID];
        const frontendApp = await this.frontendAppService.findOneById(frontendAppId);
        if (!frontendApp) {
            throw new common_1.ForbiddenException(`App ${frontendAppId} not found`);
        }
        if (!req.headers['referer']) {
            throw new common_1.BadRequestException('Missing referer');
        }
        const url = new URL(req.headers['referer']);
        const isAllowed = frontendApp.urls?.includes(url.hostname) ||
            frontendApp.urls?.includes('*');
        if (!isAllowed) {
            throw new common_1.ForbiddenException('Invalid domain');
        }
        const userAgent = req.headers['user-agent'];
        const visitor = hashValue(`${clientIp}${userAgent}`);
        Object.keys(createBrowserMetricDto.d).forEach((domain) => {
            Object.keys(createBrowserMetricDto.d[domain]).forEach((path) => {
                Object.keys(createBrowserMetricDto.d[domain][path]).forEach((initiatorType) => {
                    if (isValidInitiatorType(initiatorType)) {
                        Object.keys(createBrowserMetricDto.d[domain][path][initiatorType]).forEach(async (extension) => {
                            const { b: bytes, co: crossOrigins } = createBrowserMetricDto.d[domain][path][initiatorType][extension];
                            const [bytesCompressed, bytesUncompressed] = bytes;
                            if (bytesCompressed > 0 || bytesUncompressed > 0) {
                                const metric = {
                                    firstLoad: createBrowserMetricDto.f,
                                    colorScheme: createBrowserMetricDto.m === 'd' ? 'dark' : 'light',
                                    domain,
                                    path,
                                    initiatorType,
                                    extension: extension === '_' ? null : extension,
                                    bytesCompressed,
                                    bytesUncompressed,
                                    userAgent,
                                    visitor,
                                };
                                if (bytesCompressed === 0 &&
                                    bytesUncompressed === 300 &&
                                    initiatorType === 'fetch') {
                                    return;
                                }
                                const browserMetric = await this.browserMetricService.create(metric, frontendApp);
                                void this.browserMetricService.save(browserMetric);
                            }
                            if (crossOrigins.length) {
                                console.log(initiatorType, extension, crossOrigins);
                            }
                        });
                    }
                });
            });
        });
        return null;
    }
};
exports.BeaconController = BeaconController;
__decorate([
    (0, common_1.Options)(),
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Header)('Access-Control-Allow-Origin', '*'),
    (0, common_1.Header)('Access-Control-Allow-Methods', 'POST'),
    (0, common_1.Header)('Access-Control-Allow-Headers', [FRONTEND_APP_ID, 'Content-Type'].join(',')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BeaconController.prototype, "options", null);
__decorate([
    (0, common_1.Post)(),
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Header)('Access-Control-Allow-Origin', '*'),
    (0, common_1.Header)('Access-Control-Allow-Methods', 'POST'),
    (0, common_1.Header)('Access-Control-Allow-Headers', [FRONTEND_APP_ID, 'Content-Type'].join(',')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, client_ip_decorator_1.ClientIp)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], BeaconController.prototype, "create", null);
exports.BeaconController = BeaconController = __decorate([
    (0, common_1.Controller)('beacon'),
    __metadata("design:paramtypes", [frontend_app_service_1.FrontendAppService,
        browser_metric_service_1.BrowserMetricService])
], BeaconController);
//# sourceMappingURL=beacon.controller.js.map