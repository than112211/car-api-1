import { config } from 'dotenv';

config({ path: `${process.cwd()}/.env.${process.env.NODE_ENV}` });

export const ENV = {
  JWT_ACCESS_TOKEN_EXPIRED: process.env.JWT_ACCESS_TOKEN_EXPIRED,
  JWT_REFRESH_TOKEN_EXPIRED: process.env.JWT_REFRESH_TOKEN_EXPIRED,
  JWT_SECRET: process.env.JWT_SECRET,
};
