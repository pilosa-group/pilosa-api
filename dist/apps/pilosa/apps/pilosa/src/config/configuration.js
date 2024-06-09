"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV_DEVELOPMENT = void 0;
exports.ENV_DEVELOPMENT = 'development';
exports.default = () => ({
    app: {
        env: process.env.NODE_ENV,
    },
    database: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        ssl: Number(process.env.DB_SSL) === 1,
    },
    webSnippet: {
        beaconApiUrl: process.env.SNIPPET_BEACON_API_URL,
    },
    clerk: {
        issuerUrl: process.env.CLERK_ISSUER_URL,
    },
});
//# sourceMappingURL=configuration.js.map