"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientIp = void 0;
const common_1 = require("@nestjs/common");
exports.ClientIp = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return ((request.headers['x-forwarded-for'] || '').split(',')[0] || request.ip);
});
//# sourceMappingURL=client-ip.decorator.js.map