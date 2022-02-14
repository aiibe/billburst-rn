import { configureStore } from "@reduxjs/toolkit";
import transaction from "./reducers/transaction";

export const store = configureStore({
  reducer: {
    transactions: transaction,
  },
});

export interface RootState extends ReturnType<typeof store.getState> {}

type Dispatch = typeof store.dispatch;
export interface AppDispatch extends Dispatch {}
