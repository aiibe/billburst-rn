import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISingleTransaction, ITransaction } from "../types/transactions";

interface IInitialState {
  raw: ITransaction[];
  expanded: ISingleTransaction[];
}

const initialState: IInitialState = {
  raw: [
    {
      amount: 58.3,
      created_at: "2022-02-23T08:34:53.106196+00:00",
      currency: "$",
      description: "Beers",
      equalSplit: true,
      id: 13,
      lendees: [
        {
          email: "hakmamy@hotmail.com",
          id: "18460e75-ae08-4c85-b2da-1f48c395a671",
          username: "hakmamy",
        },
        {
          email: "alice@email.com ",
          id: "c89185c0-37d5-4f5d-a310-4a24de98dcb1",
          username: "alice",
        },
      ],
      lender: {
        email: "souksavanh.sy@gmail.com",
        id: "e5755cf4-0efb-493d-8828-06be5947951d",
        username: "souksavanh",
      },
      publisher: "e5755cf4-0efb-493d-8828-06be5947951d",
      updated_at: "2022-02-23T08:34:53.106196+00:00",
    },
  ],
  expanded: [],
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<ITransaction[]>) => {
      state.raw = action.payload;
    },
    setNewTransaction: (state, action: PayloadAction<ITransaction>) => {
      state.raw.push(action.payload);
    },
    updateExpanded: (state, action: PayloadAction<ISingleTransaction[]>) => {
      state.expanded = action.payload;
    },
  },
});

export const { setNewTransaction, updateExpanded, setTransactions } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
