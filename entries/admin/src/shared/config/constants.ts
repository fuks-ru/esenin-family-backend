export const WEBPACK_PORT = 3_000;

export const isDevelopment = process.env.NODE_ENV === 'development';

export const backendUrl = isDevelopment ? 'http://localhost:3001' : '';

export const authFrontendUrl = isDevelopment
  ? 'http://localhost:3002'
  : 'https://auth.esenin-family.ru';