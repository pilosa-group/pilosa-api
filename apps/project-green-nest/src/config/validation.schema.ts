import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),

  // Database
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().port().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),

  // WebSnippet
  SNIPPET_BEACON_API_URL: Joi.string().required(),

  // Encryption
  ENCRYPTION_PASSWORD: Joi.string().required(),
  ENCRYPTION_SALT: Joi.string().required(),

  // JWT
  JWT_SECRET: Joi.string().required(),
});
