"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const Joi = require("joi");
exports.validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().port().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DATABASE: Joi.string().required(),
    DB_SSL: Joi.number().required(),
    SNIPPET_BEACON_API_URL: Joi.string().required(),
    CLERK_ISSUER_URL: Joi.string().required(),
});
//# sourceMappingURL=validation.schema.js.map