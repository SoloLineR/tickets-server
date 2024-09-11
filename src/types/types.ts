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

export type Ticket = {
  id: number;
  title: string;
  description: string;
  amount: number;
  price: number;
  img: string;
};
