export type WebSnippetConfig = {
  beaconApiUrl: string;
};

export type DatabaseConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export type EncryptionConfig = {
  password: string;
  salt: string;
};

export type JWTConfig = {
  secret: string;
};

export type Config = {
  database: DatabaseConfig;
  webSnippet: WebSnippetConfig;
  encryption: EncryptionConfig;
  jwt: JWTConfig;
};

export default (): Config => ({
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  webSnippet: {
    beaconApiUrl: process.env.SNIPPET_BEACON_API_URL,
  },
  encryption: {
    password: process.env.ENCRYPTION_PASSWORD,
    salt: process.env.ENCRYPTION_SALT,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
