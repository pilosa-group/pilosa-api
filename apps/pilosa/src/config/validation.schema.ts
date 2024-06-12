import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  // Database
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().port().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_SSL: Joi.number().required(),

  // WebSnippet
  SNIPPET_BEACON_API_URL: Joi.string().required(),

  // Clerk
  CLERK_ISSUER_URL: Joi.string().required(),

  // Sentry
  SENTRY_DSN: Joi.string().required(),
  SENTRY_TRACES_SAMPLE_RATE: Joi.number().default(1.0),
  SENTRY_PROFILES_SAMPLE_RATE: Joi.number().default(1.0),
});
