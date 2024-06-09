"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntheticScanModule = void 0;
const common_1 = require("@nestjs/common");
const synthetic_scan_service_1 = require("./synthetic-scan.service");
const synthetic_scan_controller_1 = require("./synthetic-scan.controller");
let SyntheticScanModule = class SyntheticScanModule {
};
exports.SyntheticScanModule = SyntheticScanModule;
exports.SyntheticScanModule = SyntheticScanModule = __decorate([
    (0, common_1.Module)({
        controllers: [synthetic_scan_controller_1.SyntheticScanController],
        providers: [synthetic_scan_service_1.SyntheticScanService],
        exports: [synthetic_scan_service_1.SyntheticScanService],
    })
], SyntheticScanModule);
//# sourceMappingURL=synthetic-scan.module.js.map