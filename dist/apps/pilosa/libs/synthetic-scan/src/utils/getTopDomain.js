"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopDomain = void 0;
const getTopDomain = (url) => {
    const domain = new URL(url).hostname;
    return domain.split('.').slice(-2).join('.');
};
exports.getTopDomain = getTopDomain;
//# sourceMappingURL=getTopDomain.js.map