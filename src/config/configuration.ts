export type AwsConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
};

export type InfluxdbConfig = {
  org: string;
  url: string;
  token: string;
  bucket: string;
};

export type DatabaseConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export type Config = {
  // aws: AwsConfig;
  database: DatabaseConfig;
  influxdb: InfluxdbConfig;
};

export default (): Config => ({
  // aws: {
  //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //   region: process.env.AWS_REGION,
  // },
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  influxdb: {
    org: process.env.INFLUXDB_ORG,
    url: process.env.INFLUXDB_URL,
    token: process.env.INFLUXDB_TOKEN,
    bucket: process.env.INFLUXDB_BUCKET,
  },
});
