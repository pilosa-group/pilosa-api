import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // API
  API_BASE_URL: Joi.string()
    .required()
    .description('Public base URL of the API'),

  // Clerk
  CLERK_ISSUER_URL: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  // Database
  DB_HOST: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_PORT: Joi.number().port().required(),
  DB_SSL: Joi.number().required(),

  DB_USERNAME: Joi.string().required(),

  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  // Sentry
  SENTRY_DSN: Joi.string().optional(),

  SENTRY_PROFILES_SAMPLE_RATE: Joi.number().default(1.0),
  SENTRY_TRACES_SAMPLE_RATE: Joi.number().default(1.0),
  // WebSnippet
  SNIPPET_BEACON_API_URL: Joi.string().required(),
});
