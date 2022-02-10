import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionType } from "../types/transaction";

const initialState: TransactionType[] = [
  {
    lender: "You",
    lendee: "Sarah",
    amount: 34,
  },
];

export const transactionsSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setNewTransaction: (state, payload: PayloadAction) => {
      return state;
    },
  },
});

export const { setNewTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
