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

export const addOne = async (item: IAddNewBillParams) => {
  const { lendees, ...rest } = item;

  // Insert new bill into bills
  const { data: bills_data, error: bills_error } = await supabase
    .from("bills")
    .insert({ ...rest })
    .select("*, lender:users!bills_lender_fkey(*)")
    .limit(1)
    .single();
  if (bills_error) return { data: null, error: bills_error };

  // Prepare lendees
  const bulkLendees = lendees.map((user_id) => ({
    bill_id: bills_data.id,
    user_id,
  }));

  // Bulk insert lendees into lendees_bills
  const { error: lendees_error } = await supabase
    .from("lendees_bills")
    .insert(bulkLendees)
    .select(`user:users(*)`);
  if (lendees_error) return { data: null, error: lendees_error };

  // Get freshly inserted bill
  return await findOneById(bills_data.id);
};

/**
 * Find a bill by ID with relations
 * @param id Bill ID
 * @returns Single bill with relations
 */
export const findOneById = async (id: string | number) => {
  return await supabase
    .from("bills")
    .select(
      `*,
    lender:users!bills_lender_fkey(*),
    lendees:users!lendees_bills(*)`
    )
    .eq("id", id)
    .limit(1)
    .single();
};

export const findMany = async () => {
  return await supabase.from<ITransaction>("bills").select(
    `*,
      lender:users!bills_lender_fkey(*),
      lendees:users!lendees_bills(*)`
  );
};
