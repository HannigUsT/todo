import { log } from '../../global/logger/manager';

import { NextFunction, Request, Response } from 'express';

const errorLogger = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  log.errors.error(err);
};

export { errorLogger };
