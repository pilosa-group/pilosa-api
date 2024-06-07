export type WebSnippetConfig = {
  beaconApiUrl: string;
};

export type DatabaseConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl: boolean;
};

export type ClerkConfig = {
  issuerUrl: string;
};

export type Config = {
  database: DatabaseConfig;
  webSnippet: WebSnippetConfig;
  clerk: ClerkConfig;
};

export default (): Config => ({
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
