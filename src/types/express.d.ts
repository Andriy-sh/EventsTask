import { IUserPayload } from 'src/auth/interfaces/user-payload.interface';

declare global {
  namespace Express {
    interface Request {
      user?: IUserPayload;
    }
  }
}
