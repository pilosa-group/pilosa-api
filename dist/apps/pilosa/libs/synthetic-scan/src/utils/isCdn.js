"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCdn = void 0;
const cdnHeaders = [
    'x-cache',
    'x-amz-cf-pop',
    'x-fastly-request-id',
    'cf-cache-status',
    'x-varnish',
    'x-edge-location',
];
const isCdn = (value) => cdnHeaders.some((header) => value.response?.headers()[header]);
exports.isCdn = isCdn;
//# sourceMappingURL=isCdn.js.map