import { setupRoutes } from './routes';

import cors from 'cors';
import express, { Express } from 'express';
import { errorLogger } from '../middleware/errorLogger';
import { setLanguage } from '../middleware/setTranslation';

import { handle } from 'i18next-http-middleware';
import i18next from '../../../locales/translation';

class App {
  readonly app: Express;
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.errors();
  }

  middlewares() {
    this.app.use(handle(i18next));
    this.app.use(
      cors({
        exposedHeaders: ['Content-Disposition'],
      }),
    );
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use(setLanguage);
    setupRoutes(this.app);
  }

  errors() {
    this.app.use(errorLogger);
  }
}

export default new App().app;
