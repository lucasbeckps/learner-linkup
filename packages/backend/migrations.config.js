/* eslint-disable */
const dotenvConfig = require('dotenv').config;
const findWorkspaceRoot = require('find-yarn-workspace-root');
const DataSource = require('typeorm').DataSource;

dotenvConfig({ path: `${findWorkspaceRoot()}/.env` });

const dbdatasource = {
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: +process.env.DB_PORT,
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  synchronize: false,
  entities: ['dist/models/*.entity.js'],
  migrations: ['dist/migrations/structure/*.js', 'dist/migrations/dummy/*.js'],
  migrationsTableName: 'migrations',
};

module.exports = new DataSource(dbdatasource);
