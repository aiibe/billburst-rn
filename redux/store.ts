import { configureStore } from "@reduxjs/toolkit";
import transactions from "./reducers/transactions";

export const store = configureStore({
  reducer: {
    transactions,
  },
});

export interface RootState extends ReturnType<typeof store.getState> {}

type Dispatch = typeof store.dispatch;
export interface AppDispatch extends Dispatch {}
