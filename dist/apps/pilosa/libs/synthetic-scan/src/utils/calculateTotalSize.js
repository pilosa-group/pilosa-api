"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalSize = void 0;
const calculateTotalSize = async (networkRequests) => {
    let totalSize = 0;
    for (const networkRequest of networkRequests) {
        if (!networkRequest.request.failure()) {
            const sizes = await networkRequest.request.sizes();
            const responseBodySize = sizes.responseBodySize;
            const requestBodySize = sizes.requestBodySize;
            if (responseBodySize > 0) {
                totalSize += responseBodySize + requestBodySize;
            }
        }
    }
    return totalSize;
};
exports.calculateTotalSize = calculateTotalSize;
//# sourceMappingURL=calculateTotalSize.js.map