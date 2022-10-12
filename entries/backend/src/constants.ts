export const isDevelopment = process.env.NODE_ENV === 'development';

export const dateTimeType =
  process.env.DB_TYPE === 'postgres' ? 'timestamptz' : 'datetime';
