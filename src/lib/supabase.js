import { createClient } from "@supabase/supabase-js";

// Cloud sync is optional: without these env vars the app stays fully
// local (localStorage only) and all sync UI degrades gracefully.
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = url && anonKey ? createClient(url, anonKey) : null;
