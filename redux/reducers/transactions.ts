import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addNewBill, getBills } from "../../services/db/bills";
import { ISingleTransaction, ITransaction } from "../types/transactions";

interface IInitialState {
  raw: ITransaction[];
  expanded: ISingleTransaction[];
  loading: boolean;
  errorMessage: string;
}

const initialState: IInitialState = {
  raw: [],
  expanded: [],
  loading: false,
  errorMessage: "",
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<ITransaction[]>) => {},
    updateExpanded: (state, action: PayloadAction<ISingleTransaction[]>) => {
      state.expanded = action.payload;
    },
  },
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

export const { updateExpanded, setTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
