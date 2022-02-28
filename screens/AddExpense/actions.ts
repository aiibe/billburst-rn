import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostgrestError } from "@supabase/supabase-js";
import { ITransaction } from "../../redux/types/transactions";
import { addOne, findMany } from "../../services/db/bills";

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
    const { data, error } = await addOne(params);
    if (error) return rejectWithValue(error);

    return data;
  }
);

export const getBills = createAsyncThunk<
  ITransaction[],
  void,
  { rejectValue: PostgrestError }
>("transactions/getBills", async (_, { rejectWithValue }) => {
  const { error, data } = await findMany();
  if (error) return rejectWithValue(error);

  return !data ? [] : data;
});
