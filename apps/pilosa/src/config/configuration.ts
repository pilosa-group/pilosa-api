export type AppConfig = {
  env: string;
  port?: number;
};

export type ApiConfig = {
  baseUrl: string;
};

export type WebSnippetConfig = {
  beaconApiUrl: string;
};

export type DatabaseConfig = {
  database: string;
  host: string;
  password: string;
  port: number;
  ssl: boolean;
  username: string;
};

export type ClerkConfig = {
  issuerUrl: string;
};

export type Config = {
  api: ApiConfig;
  app: AppConfig;
  clerk: ClerkConfig;
  database: DatabaseConfig;
  webSnippet: WebSnippetConfig;
};

export const ENV_DEVELOPMENT = 'development';
export const ENV_TEST = 'test';

export default (): Config => ({
  api: {
    baseUrl: process.env.API_BASE_URL,
  },
  app: {
    env: process.env.NODE_ENV,
    port: Number(process.env.APP_PORT),
  },
  clerk: {
    issuerUrl: process.env.CLERK_ISSUER_URL,
  },
  database: {
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    ssl: Number(process.env.DB_SSL) === 1,
    username: process.env.DB_USERNAME,
  },
  webSnippet: {
    beaconApiUrl: process.env.SNIPPET_BEACON_API_URL,
  },
});
