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
exports.WebSnippetController = void 0;
const common_1 = require("@nestjs/common");
const esbuild_1 = require("esbuild");
const util = require("util");
const path = require("path");
const fs = require("fs");
const public_decorator_1 = require("../../../../libs/auth/src/decorators/public.decorator");
const readFile = util.promisify(fs.readFile);
let WebSnippetController = class WebSnippetController {
    async snippet(res) {
        const currentDir = path.resolve(__dirname);
        const snippetPath = path.resolve(currentDir, 'web-snippet-injectable.js');
        const snippetOut = path.resolve(currentDir, 'web-snippet-injectable-minified.js');
        await esbuild_1.default.build({
            entryPoints: [snippetPath],
            minify: true,
            allowOverwrite: true,
            platform: 'browser',
            outfile: snippetOut,
            define: {
                SNIPPET_API_ENDPOINT: `'${process.env.SNIPPET_BEACON_API_URL}'`,
                BATCH_REPORT_WAIT_TIME_IN_MS: '500',
            },
        });
        const snippetContents = await readFile(snippetOut, 'utf8');
        return res
            .setHeader('Content-Type', 'text/javascript')
            .setHeader('Cache-Control', `public, max-age=60`)
            .setHeader('Timing-Allow-Origin', '*')
            .status(common_1.HttpStatus.OK)
            .send(snippetContents);
    }
};
exports.WebSnippetController = WebSnippetController;
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    (0, common_1.Header)('Content-Type', 'text/javascript'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebSnippetController.prototype, "snippet", null);
exports.WebSnippetController = WebSnippetController = __decorate([
    (0, common_1.Controller)('sloth.js')
], WebSnippetController);
//# sourceMappingURL=web-snippet.controller.js.map