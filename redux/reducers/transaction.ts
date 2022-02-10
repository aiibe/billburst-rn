import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITransaction } from "../types/transaction";

const initialState: ITransaction[] = [
  {
    lender: "You",
    lendee: "Sarah",
    amount: 34,
  },
  {
    lender: "Sarah",
    lendee: "You",
    amount: 90,
  },
  {
    lender: "Sarah",
    lendee: "You",
    amount: 4.5,
  },
  {
    lender: "James",
    lendee: "You",
    amount: 3.1,
  },
  {
    lender: "You",
    lendee: "Pierre",
    amount: 411,
  },
  {
    lender: "Simon",
    lendee: "You",
    amount: 65,
  },
  {
    lender: "You",
    lendee: "Gaspar",
    amount: 5,
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
