const prodDomainUrl = 'esenin-family.ru';
const devDomainUrl = 'localhost';

export const isDevelopment = process.env.NODE_ENV === 'development';

export const domainUrl = isDevelopment ? devDomainUrl : prodDomainUrl;

export const ports = {
  ADMIN_FRONTEND_PORT: 3_000,
  BACKEND_PORT: 3_001,
};

export const urls = {
  ADMIN_FRONTEND_URL: isDevelopment
    ? `http://${devDomainUrl}:${ports.ADMIN_FRONTEND_PORT}`
    : `https://${prodDomainUrl}`,

  BACKEND_URL: isDevelopment
    ? `http://${devDomainUrl}:${ports.BACKEND_PORT}`
    : `https://${prodDomainUrl}`,
};

export const API_PREFIX = '/api';
