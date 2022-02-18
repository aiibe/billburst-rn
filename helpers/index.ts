import { ISingleTransaction, ITransaction } from "../redux/types/transaction";

/**
 * Split transactions from grouped/raw transactions
 * @param rawTransactions Grouped or raw transactions from source
 * @returns Array of transactions split
 */
export function burstTransactions(rawTransactions: ITransaction[]) {
  return rawTransactions.reduce(
    (
      acc: ISingleTransaction[],
      { lender, lendees, amount, equalSplit, ...rest }
    ) => {
      // [!] equalSplit among lendees only, not including 'You' ?
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

/**
 * Sum transactions into tuples
 * @param transactions
 * @returns [ ['Sarah', -5], ...]
 */
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

/**
 * Add details to transaction
 * @param transaction
 * @returns transactions with details
 */
export function dissectTransaction(transaction: ITransaction) {
  const { equalSplit, lender, lendees, amount, ...rest } = transaction;
  const members = [...lendees, lender];
  const divisor = equalSplit ? members.length : lendees.length;
  const paid = Math.round((amount / divisor) * 100) / 100;
  const details = members.map((member) => {
    return !equalSplit && member === lender
      ? { name: member, amount }
      : { name: member, amount: -paid };
  });
  return { ...transaction, details };
}
