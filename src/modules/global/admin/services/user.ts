import { Request, Response } from 'express';

export class UserService {
  public getUsername(req: Request, res: Response) {
    const user = {
      username: req.user!.username,
    };
    return user;
  }
}
