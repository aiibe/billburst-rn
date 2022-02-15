export interface ITransaction {
  lender: string;
  lendees: string[];
  amount: number;
  date: string;
  equalSplit: boolean;
  description: string;
  // currency
}

export interface ISingleTransaction {
  lender: string;
  lendee: string;
  paid: number;
  date: string;
  equalSplit: boolean;
  description: string;
}
