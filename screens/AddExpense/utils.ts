interface IDivideTransactionEquallyParams {
  users: { name: string }[];
  amount: number;
  lender: string;
}

export function divideTransactionEqually({
  users,
  amount,
  lender,
}: IDivideTransactionEquallyParams) {
  const fractionAmount = Math.round((amount / users.length) * 100) / 100; // Rounded to 2 decimals
  const peers = users.filter(({ name }) => name !== lender);
  return peers.map(({ name }) => ({
    lender,
    lendee: name,
    amount: fractionAmount,
  }));
}
