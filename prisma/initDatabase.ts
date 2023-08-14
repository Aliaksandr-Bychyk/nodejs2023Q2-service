import { Client } from 'pg';
import { config } from 'dotenv';

config();

const user = process.env.PG_DB_USERNAME || 'postgres';
const host = process.env.PG_HOST || 'localhost';
const database = 'postgres';
const password = process.env.PG_DB_PASSWORD || 'admin';
const port = +process.env.PG_DB_PORT || 5432;
const databaseName = process.env.PG_DB_NAME || 'homelibrary';

const dbParams = {
  user,
  host,
  database,
  password,
  port,
};

(async () => {
  const client = new Client(dbParams);

  try {
    await client.connect();
    await client.query(`CREATE DATABASE ${databaseName}`);
    console.log(`Database '${databaseName}' created successfully`);
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    await client.end();
  }
})();
