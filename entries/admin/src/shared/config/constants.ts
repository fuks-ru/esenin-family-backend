export const WEBPACK_PORT = 3_000;

export const isDevelopment = process.env.NODE_ENV === 'development';

export const backendUrl = isDevelopment
  ? 'http://localhost:3001'
  : 'https://esenin-family.ru';

export const bucketUploadUrl = isDevelopment
  ? 'http://localhost:2000/upload'
  : 'https://minio.esenin-family.ru/upload';

export const bucketShowUrl = isDevelopment
  ? 'http://localhost:9000/dev-bucket'
  : 'https://minio.esenin-family.ru/esenin-family';

export const authFrontendUrl = isDevelopment
  ? 'http://localhost:3002'
  : 'https://auth.esenin-family.ru';
