import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITransaction } from "../types/transaction";

const initialState: ITransaction[] = [
  {
    lender: "You",
    lendee: "Sarah",
    amount: 34,
    date: JSON.stringify(new Date(2021, 7, 12)),
  },
  {
    lender: "Sarah",
    lendee: "You",
    amount: 90,
    date: JSON.stringify(new Date(2021, 7, 12)),
  },
  {
    lender: "Sarah",
    lendee: "You",
    amount: 4.5,
    date: JSON.stringify(new Date(2021, 8, 10)),
  },
  {
    lender: "James",
    lendee: "You",
    amount: 3.1,
    date: JSON.stringify(new Date(2021, 9, 21)),
  },
  {
    lender: "You",
    lendee: "Pierre",
    amount: 411,
    date: JSON.stringify(new Date(2021, 10, 12)),
  },
  {
    lender: "Simon",
    lendee: "You",
    amount: 65,
    date: JSON.stringify(new Date(2021, 10, 2)),
  },
  {
    lender: "You",
    lendee: "Gaspar",
    amount: 5,
    date: JSON.stringify(new Date(2021, 8, 15)),
  },
];

export const transactionsSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setNewTransaction: (state, action: PayloadAction<ITransaction>) => {
      state.push(action.payload);
    },
  },
});

export const { setNewTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
