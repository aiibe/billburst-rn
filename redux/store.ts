import { configureStore } from "@reduxjs/toolkit";
import expense from "./reducers/expense";
import transaction from "./reducers/transaction";

export const store = configureStore({
  reducer: {
    transactions: transaction,
    expense: expense,
  },
});

export interface RootState extends ReturnType<typeof store.getState> {}

type Dispatch = typeof store.dispatch;
export interface AppDispatch extends Dispatch {}
