import { configureStore } from "@reduxjs/toolkit";
import transactions from "./reducers/transactions";
import user from "./reducers/user";

export const store = configureStore({
  reducer: {
    transactions,
    user,
  },
});

export interface RootState extends ReturnType<typeof store.getState> {}

type Dispatch = typeof store.dispatch;
export interface AppDispatch extends Dispatch {}
