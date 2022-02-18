import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISingleTransaction, ITransaction } from "../types/transactions";

interface IInitialState {
  raw: ITransaction[];
  expanded: ISingleTransaction[];
}

const initialState: IInitialState = {
  raw: [
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
      lender: "Jim",
      lendees: ["You", "Mike"],
      amount: 90,
      date: JSON.stringify(new Date(2021, 11, 4)),
      description: "Car repair",
      equalSplit: false,
    },
  ],
  expanded: [],
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setNewTransaction: (state, action: PayloadAction<ITransaction>) => {
      state.raw.push(action.payload);
    },
  },
});

export const { setNewTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
