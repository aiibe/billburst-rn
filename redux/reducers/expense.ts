import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExpense } from "../types/expense";

const initialState: IExpense = {
  users: [],
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addFriend: (state, action: PayloadAction<string>) => {
      state.users.push({ name: action.payload });
    },
  },
});

export const { addFriend } = expenseSlice.actions;
export default expenseSlice.reducer;
