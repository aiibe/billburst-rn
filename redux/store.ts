import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./reducers/transaction";

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
  },
});

export interface RootState extends ReturnType<typeof store.getState> {}

type Dispatch = typeof store.dispatch;
export interface AppDispatch extends Dispatch {}
