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
exports.SyntheticScanService = void 0;
const common_1 = require("@nestjs/common");
const playwright_1 = require("playwright");
const co2_1 = require("@tgwf/co2");
const calculateTotalSize_1 = require("./utils/calculateTotalSize");
const getTopDomain_1 = require("./utils/getTopDomain");
const formatBytes_1 = require("./utils/formatBytes");
const isCdn_1 = require("./utils/isCdn");
const isCompressed_1 = require("./utils/isCompressed");
const isCacheable_1 = require("./utils/isCacheable");
const findRequestByContentType_1 = require("./utils/findRequestByContentType");
const cache_manager_1 = require("@nestjs/cache-manager");
const ignoreDomains = ['localhost'];
const logger = console.log;
const scrollPageToEnd = async (page) => {
    const scrollStep = 250;
    while (true) {
        await page.evaluate((scrollStep) => {
            window.scrollBy(0, scrollStep);
        }, scrollStep);
        await page.waitForTimeout(50);
        const totalScroll = await page.evaluate(() => {
            return Math.ceil(document.body.scrollHeight - window.innerHeight);
        });
        const currentScroll = await page.evaluate(() => {
            return Math.ceil(window.scrollY);
        });
        if (currentScroll >= totalScroll) {
            break;
        }
    }
};
const co2Emission = new co2_1.co2({});
async function toFileTypeResult(networkRequests, greenHost) {
    const totalBytes = await (0, calculateTotalSize_1.calculateTotalSize)(networkRequests);
    return {
        count: networkRequests.length,
        totalBytes,
        totalBytesFormatted: (0, formatBytes_1.formatBytes)(totalBytes),
        estimatedCo2: co2Emission.perByte(totalBytes, greenHost),
    };
}
let SyntheticScanService = class SyntheticScanService {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
    }
    async run(url) {
        const cachedResult = await this.cacheManager.get(url);
        if (cachedResult) {
            console.log('from cache', url);
            return cachedResult;
        }
        const browser = await playwright_1.chromium.launch({});
        const page = await browser.newPage({
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        });
        let domReadyTime;
        let loadTime;
        let networkRequests = [];
        async function handleRequest(request) {
            networkRequests.push({
                url: request.url(),
                request,
                response: await request.response(),
            });
        }
        const handleDomContentLoaded = () => {
            domReadyTime = (Date.now() - startTime) / 1000;
        };
        const handleLoad = () => {
            loadTime = (Date.now() - startTime) / 1000;
        };
        page.on('requestfinished', handleRequest);
        page.on('domcontentloaded', handleDomContentLoaded);
        page.on('load', handleLoad);
        const startTime = Date.now();
        logger(`Visiting ${url}`);
        await page.goto(url);
        await page.waitForLoadState('load');
        const networkIdleTime = (Date.now() - startTime) / 1000;
        await scrollPageToEnd(page);
        networkRequests = Array.from(new Map(networkRequests.map((request) => [request.url, request])).values());
        const domainRequests = Array.from(new Set(networkRequests
            .map((request) => new URL(request.url).hostname)
            .filter((hostname) => !ignoreDomains.includes(hostname))));
        const pageTitle = await page.title();
        const totalBytes = await (0, calculateTotalSize_1.calculateTotalSize)(networkRequests);
        const mainTopDomain = (0, getTopDomain_1.getTopDomain)(url);
        console.log(mainTopDomain);
        const green = (await co2_1.hosting.check(mainTopDomain));
        logger(`Calculating total results`);
        const result = {
            total: {
                domain: null,
                pageTitle,
                hosting: [
                    {
                        domain: mainTopDomain,
                        green,
                    },
                ],
                numberOfRequests: networkRequests.length,
                time: {
                    domReady: domReadyTime,
                    load: loadTime,
                    networkIdle: networkIdleTime,
                },
                totalBytes: totalBytes,
                totalBytesFormatted: (0, formatBytes_1.formatBytes)(totalBytes),
                estimatedCo2: co2Emission.perVisit(totalBytes, green),
                cdnPercentage: (networkRequests.filter(isCdn_1.isCdn).length / networkRequests.length) * 100,
                compressedPercentage: (networkRequests.filter(isCompressed_1.isCompressed).length /
                    networkRequests.length) *
                    100,
                cachePercentage: (networkRequests.filter(isCacheable_1.isCacheable).length /
                    networkRequests.length) *
                    100,
                fileTypes: {
                    images: await toFileTypeResult(networkRequests.filter((0, findRequestByContentType_1.findRequestByContentType)('image/')), green),
                    scripts: await toFileTypeResult(networkRequests.filter((0, findRequestByContentType_1.findRequestByContentType)('javascript')), green),
                    stylesheets: await toFileTypeResult(networkRequests.filter((0, findRequestByContentType_1.findRequestByContentType)('text/css')), green),
                    json: await toFileTypeResult(networkRequests.filter((0, findRequestByContentType_1.findRequestByContentType)('json')), green),
                    fonts: await toFileTypeResult(networkRequests.filter((0, findRequestByContentType_1.findRequestByContentType)('font')), green),
                    video: await toFileTypeResult(networkRequests.filter((0, findRequestByContentType_1.findRequestByContentType)('video')), green),
                    audio: await toFileTypeResult(networkRequests.filter((0, findRequestByContentType_1.findRequestByContentType)('audio')), green),
                },
            },
            domains: domainRequests,
        };
        void browser.close();
        await this.cacheManager.set(url, result, 60 * 60 * 10);
        return result;
    }
};
exports.SyntheticScanService = SyntheticScanService;
exports.SyntheticScanService = SyntheticScanService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], SyntheticScanService);
//# sourceMappingURL=synthetic-scan.service.js.map