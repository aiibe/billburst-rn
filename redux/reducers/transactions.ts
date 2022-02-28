import { createSlice } from "@reduxjs/toolkit";
import { addNewBill, getBills } from "../../services/db/bills";
import { ITransaction } from "../types/transactions";

interface IInitialState {
  raw: ITransaction[];
  loading: boolean;
  errorMessage: string;
}

const initialState: IInitialState = {
  raw: [],
  loading: false,
  errorMessage: "",
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    // Get/Set Bills
    addCase(getBills.pending, (state) => {
      state.loading = true;
    });
    addCase(getBills.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.raw = payload;
    });
    addCase(getBills.rejected, (state, { payload }) => {
      state.loading = false;
      if (payload) state.errorMessage = payload.message;
    });

    // Add New Bill
    addCase(addNewBill.pending, (state) => {
      state.loading = true;
    });
    addCase(addNewBill.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.raw.push(payload);
    });
    addCase(addNewBill.rejected, (state, { payload }) => {
      state.loading = false;
      if (payload) state.errorMessage = payload.message;
    });
  },
});

export const {} = transactionsSlice.actions;
export default transactionsSlice.reducer;
