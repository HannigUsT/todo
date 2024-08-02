import {Request} from 'express';

export class UserService {
    public getUsername(req: Request) {
        return {
            username: req.user!.username,
        };
    }
}
