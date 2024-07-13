import i18next from '../../../locales/translation';

import { NextFunction, Request, Response } from 'express';

const setLanguage = (req: Request, res: Response, next: NextFunction): void => {
  if (req.headers['accept-language'] !== undefined) {
    i18next.changeLanguage(req.headers['accept-language']);
  }

  next();
};

export { setLanguage };
