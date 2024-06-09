"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSnippetModule = void 0;
const common_1 = require("@nestjs/common");
const web_snippet_controller_1 = require("./web-snippet.controller");
const cache_manager_1 = require("@nestjs/cache-manager");
let WebSnippetModule = class WebSnippetModule {
};
exports.WebSnippetModule = WebSnippetModule;
exports.WebSnippetModule = WebSnippetModule = __decorate([
    (0, common_1.Module)({
        imports: [cache_manager_1.CacheModule.register()],
        controllers: [web_snippet_controller_1.WebSnippetController],
    })
], WebSnippetModule);
//# sourceMappingURL=web-snippet.module.js.map