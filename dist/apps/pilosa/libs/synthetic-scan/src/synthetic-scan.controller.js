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
exports.SyntheticScanController = void 0;
const common_1 = require("@nestjs/common");
const public_decorator_1 = require("../../auth/src/decorators/public.decorator");
const synthetic_scan_service_1 = require("./synthetic-scan.service");
let SyntheticScanController = class SyntheticScanController {
    constructor(syntheticScanService) {
        this.syntheticScanService = syntheticScanService;
    }
    scan({ url }) {
        try {
            return this.syntheticScanService.run(url);
        }
        catch (error) {
            console.error(error);
            throw new Error('Unable to scan URL');
        }
    }
};
exports.SyntheticScanController = SyntheticScanController;
__decorate([
    (0, common_1.Post)(),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SyntheticScanController.prototype, "scan", null);
exports.SyntheticScanController = SyntheticScanController = __decorate([
    (0, common_1.Controller)('synthetic-scan'),
    __metadata("design:paramtypes", [synthetic_scan_service_1.SyntheticScanService])
], SyntheticScanController);
//# sourceMappingURL=synthetic-scan.controller.js.map