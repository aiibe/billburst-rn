import supabase from "../../supabase";

interface IAddNewBillParams {
  _amount: number;
  _description: string;
  _publisher: string;
  _equalSplit: boolean;
  _lendees: string[];
}

export async function addNewBill(params: IAddNewBillParams) {
  return await supabase.rpc("handle_new_bill", params);
}
