import { User } from '../modules/global/admin/models';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
