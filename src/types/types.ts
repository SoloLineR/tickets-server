declare global {
  namespace Express {
    interface Request {
      user?: DataStoredInToken;
    }
  }
}
export interface DataStoredInToken {
  id: number;
  roleid: number;
  email: string;
}
export type User = {
  id: number;
  roleid: number;
  email: string;
  money: number;
  password: string;
};
