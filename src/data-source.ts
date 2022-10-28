import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config({ path: `${process.cwd()}/.env.${process.env.NODE_ENV}` });

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/entity/*.js'],
  migrations: [__dirname + '/migrations/*.js'],
});

export default AppDataSource;
