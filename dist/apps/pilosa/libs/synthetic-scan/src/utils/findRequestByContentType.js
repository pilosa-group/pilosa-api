"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRequestByContentType = void 0;
const findRequestByContentType = (contentType) => (value) => {
    const response = value.response;
    if (!response) {
        return false;
    }
    const headers = response.headers();
    return headers['content-type']?.includes(contentType);
};
exports.findRequestByContentType = findRequestByContentType;
//# sourceMappingURL=findRequestByContentType.js.map