import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ypjiwbzbafrtvnwxlcmn.supabase.co";
const supabaseKey = "sb_publishable_wUA3Rjy3Jb6TZUZrEDB_FQ_rYhtO5VZ";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);