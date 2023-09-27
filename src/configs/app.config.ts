import { config } from 'dotenv';

config({ path: (process.cwd(), '.env') });

export const databaseConfig = {
  type: process.env.DB_TYPE,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: process.env.DB_SYNCHRONIZE,
};

export const redisConfig = {
  HOST: process.env.REDIS_HOST,
  PORT: process.env.REDIS_PORT,
  PREFIX: process.env.REDIS_PREFIX,
};

export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
};

export const cloudflareConfig = {
  auth_email: process.env.CF_AUTH_EMAIL,
  auth_key: process.env.CF_AUTH_KEY,
  region: process.env.CF_REGION,
  account: process.env.CF_ACCOUNT_ID,
  access_key_id: process.env.CF_ACCESS_KEY_ID,
  secret_access_key: process.env.CF_SECRET_ACCESS_KEY,
  bucket: process.env.CF_BUCKET,
};
