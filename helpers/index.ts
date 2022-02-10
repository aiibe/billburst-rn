import { ITransaction } from "../redux/types/transaction";

export interface IGroupTransaction {
  0: string;
  1: number;
}

// Group and sum transactions into tuples like ['Sarah', -45]
export const groupTransactions = (transactions: ITransaction[]) => {
  return transactions
    .reduce((acc: IGroupTransaction[], transaction: ITransaction) => {
      transaction.lender === "You"
        ? acc.push([transaction.lendee, transaction.amount])
        : acc.push([transaction.lender, -transaction.amount]);
      return acc;
    }, [])
    .reduce((acc: IGroupTransaction[], transaction: IGroupTransaction) => {
      const members = new Set(acc.map((t) => t[0]));
      if (members.has(transaction[0])) {
        const slot = acc.findIndex((t) => t[0] === transaction[0]);
        acc[slot] = [acc[slot][0], acc[slot][1] + transaction[1]];
      } else {
        acc.push(transaction);
      }
      return acc;
    }, []);
};
