import transactions from "../redux/reducers/transactions";
import {
  ISingleTransaction,
  ITransaction,
  IUser,
} from "../redux/types/transactions";

/**
 * Split transactions from grouped/raw transactions
 * @param rawTransactions Grouped or raw transactions from source
 * @returns Array of transactions split
 */
export function burstTransactions(rawTransactions: ITransaction[]) {
  return rawTransactions.reduce(
    (acc: ISingleTransaction[], transaction: ITransaction) => {
      const { lender, lendees, amount, equalSplit, ...rest } = transaction;

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
export function sumTransactions(
  transactions: ISingleTransaction[],
  userId: string
) {
  const peers = new Set();
  return transactions
    .filter(({ lender, lendee }) => [lender.id, lendee.id].includes(userId))
    .map(({ lender, lendee, paid }) =>
      lendee.id === userId ? [lender.username, -paid] : [lendee.username, paid]
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
    return !equalSplit && member.username === lender.username
      ? { name: member.username, amount }
      : { name: member.username, amount: -paid };
  });
  return { ...transaction, details };
}

export function friendTransactions(
  transactions: ITransaction[],
  friendName: string,
  currentUser: IUser | null
) {
  const userInLendees = (lendees: IUser[], username: string | undefined) => {
    const members = new Set();
    lendees.forEach((user) => members.add(user.username));
    return members.has(username);
  };

  return transactions
    .filter(
      ({ lendees, lender }) =>
        lender.username === friendName ||
        (userInLendees(lendees, friendName) &&
          lender.username === currentUser?.username)
    )
    .sort(
      (a, b) =>
        new Date(JSON.parse(b.updated_at)).getTime() -
        new Date(JSON.parse(a.updated_at)).getTime()
    );
}
