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

/**
 * Insert a bill with relations (lendees)
 * @param item New bill to insert
 * @returns Inserted bill
 */
export const addOne = async (item: IAddNewBillParams) => {
  const { lendees, ...rest } = item;

  // Insert new bill into bills
  const resBills = await supabase
    .from("bills")
    .insert({ ...rest })
    .select(`id`)
    .limit(1)
    .single();
  if (resBills.error) return resBills;

  // Prepare lendees
  const bulkLendees = lendees.map((user_id) => ({
    bill_id: resBills.data.id,
    user_id,
  }));

  // Bulk insert lendees into lendees_bills
  const resLendees = await supabase.from("lendees_bills").insert(bulkLendees);
  if (resLendees.error) return resLendees;

  // Get freshly inserted bill
  return await findOneById(resBills.data.id);
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

/**
 * Fetch all bills
 * @returns Bills
 */
export const findMany = async () => {
  return await supabase.from<ITransaction>("bills").select(
    `*,
      lender:users!bills_lender_fkey(*),
      lendees:users!lendees_bills(*)`
  );
};
