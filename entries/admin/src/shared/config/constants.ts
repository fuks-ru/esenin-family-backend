/**
 * Порт webpack.config.
 */
export const WEBPACK_PORT = 3_000;

/**
 * Находимся ли мы в dev режиме.
 */
export const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Адрес для запросов на бэк.
 */
export const backendUrl = isDevelopment ? 'http://localhost:3001' : '';
