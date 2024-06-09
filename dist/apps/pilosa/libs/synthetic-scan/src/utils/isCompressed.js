"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCompressed = void 0;
const isCompressed = (value) => !!value.response?.headers()['content-encoding']?.includes('gzip');
exports.isCompressed = isCompressed;
//# sourceMappingURL=isCompressed.js.map