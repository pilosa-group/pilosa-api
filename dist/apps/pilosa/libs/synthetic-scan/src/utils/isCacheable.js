"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCacheable = exports.isPrivateCacheable = exports.isPublicCacheable = void 0;
const isPublicCacheable = (cacheControl) => cacheControl.includes('public');
exports.isPublicCacheable = isPublicCacheable;
const isPrivateCacheable = (cacheControl) => cacheControl.includes('private');
exports.isPrivateCacheable = isPrivateCacheable;
const isCacheable = (value) => {
    const cacheControl = value.response?.headers()['cache-control'];
    return (cacheControl &&
        ((0, exports.isPublicCacheable)(cacheControl) || (0, exports.isPrivateCacheable)(cacheControl)));
};
exports.isCacheable = isCacheable;
//# sourceMappingURL=isCacheable.js.map