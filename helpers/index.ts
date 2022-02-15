import { ISingleTransaction, ITransaction } from "../redux/types/transaction";

// Split transactions from grouped/raw transactions
export function burstTransactions(rawTransactions: ITransaction[]) {
  return rawTransactions.reduce(
    (
      acc: ISingleTransaction[],
      { lender, lendees, amount, equalSplit, ...rest }
    ) => {
      const paid = equalSplit
        ? Math.round((amount / (lendees.length + 1)) * 100) / 100
        : amount;
      lendees.forEach((lendee) =>
        acc.push({ lender, paid, lendee, equalSplit, ...rest })
      );
      return acc;
    },
    []
  );
}

// Group all transaction that include You
export function groupTransactions(transactions: ITransaction[]) {
  return burstTransactions(transactions).filter(
    ({ lender, lendee }) => lender === "You" || lendee === "You"
  );
}

// Sum transactions that includes You into tuples like ['Sarah', -45]
export function sumTransactions(transactions: ISingleTransaction[]) {
  const peers = new Set();
  return transactions
    .map(({ lender, lendee, paid }) =>
      lendee === "You" ? [lender, -paid] : [lendee, paid]
    )
    .reduce((acc: [string, number][], transaction: any) => {
      const lender = transaction[0];
      const amount = Math.round(transaction[1] * 100) / 100;

      if (!peers.has(lender)) {
        peers.add(lender);
        acc.push(transaction);
      } else {
        const idx = acc.findIndex((a) => a[0] === lender);
        acc[idx] = [acc[idx][0], acc[idx][1] + amount];
      }
      return acc;
    }, []);
}
