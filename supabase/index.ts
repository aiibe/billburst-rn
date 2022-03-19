import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_DB_KEY, SUPABASE_DB_URL } from "react-native-dotenv";

const supabase = createClient(SUPABASE_DB_URL, SUPABASE_DB_KEY, {
  localStorage: AsyncStorage as any,
});

export default supabase;
