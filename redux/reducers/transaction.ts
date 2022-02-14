import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITransaction } from "../types/transaction";

const initialState: ITransaction[] = [
  {
    lender: "You",
    lendee: "Sarah",
    amount: 34,
    date: new Date(2021, 7, 12),
  },
  {
    lender: "Sarah",
    lendee: "You",
    amount: 90,
    date: new Date(2021, 7, 12),
  },
  {
    lender: "Sarah",
    lendee: "You",
    amount: 4.5,
    date: new Date(2021, 8, 10),
  },
  {
    lender: "James",
    lendee: "You",
    amount: 3.1,
    date: new Date(2021, 9, 21),
  },
  {
    lender: "You",
    lendee: "Pierre",
    amount: 411,
    date: new Date(2021, 10, 12),
  },
  {
    lender: "Simon",
    lendee: "You",
    amount: 65,
    date: new Date(2021, 10, 2),
  },
  {
    lender: "You",
    lendee: "Gaspar",
    amount: 5,
    date: new Date(2021, 8, 15),
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
