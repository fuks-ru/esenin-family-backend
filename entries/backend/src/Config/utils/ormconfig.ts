import { isDevelopment } from '@difuks/esenin-family-constants';
import { DataSource, DataSourceOptions } from 'typeorm';

const rootDir = isDevelopment ? 'src' : 'dist/build';

/**
 * Prod конфиг БД.
 */
export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5_432,
  synchronize: false,
  database: 'auth',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: [`${rootDir}/**/entities/*.{ts,js}`],
  migrationsTableName: 'migration',
  migrations: [`${rootDir}/__migration__/*.{ts,js}`],
};

const devDataSource = new DataSource(ormConfig);

/**
 * Конфиг, описывающий схему БД для миграций.
 */
export default devDataSource;