export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';

      DB_PORT: string;
      DB_HOST: string;
      DB_NAME: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_SCHEMA: string;
    }
  }
}
