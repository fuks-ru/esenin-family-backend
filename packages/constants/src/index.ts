const prodDomainUrl = 'esenin-family.ru';
const devDomainUrl = 'localhost';

/**
 * Находимся ли мы в dev режиме.
 */
export const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Базовый url для всех сервисов.
 */
export const domainUrl = isDevelopment ? devDomainUrl : prodDomainUrl;

/**
 * Порты всех сервисов.
 */
export const ports = {
  ADMIN_FRONTEND_PORT: 3_000,
  BACKEND_PORT: 3_001,
};

/**
 * Маршруты ко всем сервисам.
 */
export const urls = {
  ADMIN_FRONTEND_URL: isDevelopment
    ? `http://${devDomainUrl}:${ports.ADMIN_FRONTEND_PORT}`
    : `https://${prodDomainUrl}`,

  BACKEND_URL: isDevelopment
    ? `http://${devDomainUrl}:${ports.BACKEND_PORT}`
    : `https://${prodDomainUrl}`,
};

/**
 * Префикс API-запросов.
 */
export const API_PREFIX = '/api';
