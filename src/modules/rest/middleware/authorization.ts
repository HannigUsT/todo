import { NextFunction, Request, Response } from 'express';
import prisma from '../../../database/prisma';
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({
      data: req.t('user.user_unauthorized'),
    });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString(
    'ascii',
  );
  const [username, password] = credentials.split(':');

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({
        data: req.t('user.user_unauthorized'),
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const authorize = (permissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user || !permissions.some((p) => user.permissions.includes(p))) {
      return res.status(403).json({
        data: req.t('user.user_forbidden'),
      });
    }
    next();
  };
};
