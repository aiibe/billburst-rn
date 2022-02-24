import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostgrestError } from "@supabase/supabase-js";
import { ITransaction } from "../../redux/types/transactions";
import supabase from "../../supabase";

interface IAddNewBillParams {
  amount: number;
  description: string;
  publisher: string;
  equalSplit: boolean;
  lendees: string[];
  lender: string;
}

export const addNewBill = createAsyncThunk<
  ITransaction,
  IAddNewBillParams,
  { rejectValue: PostgrestError }
>(
  "transactions/addNewBill",
  async (params: IAddNewBillParams, { rejectWithValue }) => {
    const { lendees, ...rest } = params;

    // Insert new bill into bills
    const { data: bills_data, error: bills_error } = await supabase
      .from("bills")
      .insert({ ...rest })
      .select("*, lender:users!bills_lender_fkey(*)")
      .limit(1)
      .single();
    if (bills_error) return rejectWithValue(bills_error);

    // Bulk insert lendees into lendees_bills
    const { data: lendees_data, error: lendees_error } = await supabase
      .from("lendees_bills")
      .insert(
        lendees.map((user_id) => ({
          bill_id: bills_data.id,
          user_id,
        }))
      );
    if (lendees_error) return rejectWithValue(lendees_error);

    // Manually assemble payload with embed lendees
    const payload: ITransaction = {
      ...bills_data,
      lendees: lendees_data,
    };

    return payload;
  }
);

export async function getBills() {
  return await supabase.from<ITransaction>("bills").select(
    `*,
      lender:users!bills_lender_fkey(*),
      lendees:users!lendees_bills(*)`
  );
}
