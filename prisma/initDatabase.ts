import { Client } from 'pg';
import { config } from 'dotenv';

config();

const user = process.env.POSTGRES_USER || 'postgres';
const host = process.env.POSTGRES_HOST || 'localhost';
const database = process.env.POSTGRES_DATABASE || 'postgres';
const password = process.env.POSTGRES_PASSWORD || 'admin';
const port = +process.env.POSTGRES_PORT || 5432;

const dbParams = {
  user,
  host,
  database,
  password,
  port,
};

const databaseName = 'homelibrary';

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
