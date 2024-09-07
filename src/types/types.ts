declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
export interface DataStoredInToken {
  id: number;
  roleId: number;
  email: string;
}
export type User = {
  id: number;
  roleId: number;
  email: string;
};
