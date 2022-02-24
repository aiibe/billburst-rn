import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTransactions } from "../../redux/reducers/transactions";
import { ITransaction } from "../../redux/types/transactions";
import supabase from "../../supabase";

interface IAddNewBillParams {
  _amount: number;
  _description: string;
  _publisher: string;
  _equalSplit: boolean;
  _lendees: string[];
  _lender: string;
}

export const addNewBill = createAsyncThunk(
  "transactions/addNewBill",
  async (params: IAddNewBillParams) => {
    const { error } = await supabase.rpc<ITransaction>(
      "handle_new_bill",
      params
    );
    if (error) return console.log("addNewBill, ", error);

    const { data } = await getBills();
    return data;
  }
);

export async function getBills() {
  return await supabase.from<ITransaction>("bills").select(
    `*,
      lender:users!bills_publisher_fkey(*),
      lendees:users!lendees_bills(*)`
  );
}
