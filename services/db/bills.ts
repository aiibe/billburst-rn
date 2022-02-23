import supabase from "../../supabase";

interface IAddNewBillParams {
  _amount: number;
  _description: string;
  _publisher: string;
  _equalSplit: boolean;
  _lendees: string[];
  _lender: string;
}

export async function addNewBill(params: IAddNewBillParams) {
  return await supabase.rpc("handle_new_bill", params);
}

export async function getBills() {
  return await supabase.from("bills").select(
    `*,
      lender:users!bills_publisher_fkey(*),
      lendees:users!lendees_bills(*)`
  );
}
