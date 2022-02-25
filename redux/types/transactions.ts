import { IUser } from "./user";

export interface ITransaction {
  lender: IUser;
  lendees: IUser[];
  amount: number;
  created_at: string;
  updated_at: string;
  equalSplit: boolean;
  description: string;
  currency: string;
  publisher: string;
  id: number;
}

export interface ISingleTransaction {
  id: number;
  lender: IUser;
  lendee: IUser;
  paid: number;
  created_at: string;
  updated_at: string;
  equalSplit: boolean;
  description: string;
  currency: string;
  publisher: string;
}
