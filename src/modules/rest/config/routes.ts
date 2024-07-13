import { Express, Router } from 'express';
import { readdirSync } from 'fs';
import { log } from '../../global/logger/manager';

export const setupRoutes = (app: Express): void => {
  try {
    const router = Router();
    app.use('/api', router);
    readdirSync(`${__dirname}/../routes`).map(async (fileName) => {
      (await import(`../routes/${fileName}`)).default(router);
    });
  } catch (error) {
    log.business.error(`Error setuping routes`);
  }
};
