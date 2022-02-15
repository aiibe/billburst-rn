import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITransaction } from "../types/transaction";

const initialState: ITransaction[] = [
  {
    lender: "You",
    lendees: ["Sarah", "James"],
    amount: 34,
    date: JSON.stringify(new Date(2021, 7, 12)),
    description: "Concert",
    equalSplit: true,
  },
  {
    lender: "Sarah",
    lendees: ["You", "James"],
    amount: 57,
    date: JSON.stringify(new Date(2021, 7, 12)),
    description: "Fast food",
    equalSplit: true,
  },
  {
    lender: "Sarah",
    lendees: ["You"],
    amount: 90,
    date: JSON.stringify(new Date(2021, 11, 4)),
    description: "Car repair",
    equalSplit: false,
  },
  // {
  //   lender: "Sarah",
  //   lendee: "You",
  //   amount: 4.5,
  //   date: JSON.stringify(new Date(2021, 8, 10)),
  //   description: "Fast food",
  // },
  // {
  //   lender: "James",
  //   lendee: "You",
  //   amount: 3.1,
  //   date: JSON.stringify(new Date(2021, 9, 21)),
  //   description: "Fast food",
  // },
  // {
  //   lender: "You",
  //   lendee: "Pierre",
  //   amount: 411,
  //   date: JSON.stringify(new Date(2021, 10, 12)),
  //   description: "Fast food",
  // },
  // {
  //   lender: "Simon",
  //   lendee: "You",
  //   amount: 65,
  //   date: JSON.stringify(new Date(2021, 10, 2)),
  //   description: "Fast food",
  // },
  // {
  //   lender: "You",
  //   lendee: "Gaspar",
  //   amount: 5,
  //   date: JSON.stringify(new Date(2021, 8, 15)),
  //   description: "Fast food",
  // },
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
