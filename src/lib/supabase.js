import { createClient } from "@supabase/supabase-js";

// Cloud sync is optional: without these env vars the app stays fully
// local (localStorage only) and all sync UI degrades gracefully.
// Accept common paste mistakes: trailing slashes or the /rest/v1 (or
// /auth/v1) suffix shown on the dashboard's Data API page. The client
// needs the bare project origin, e.g. https://abc.supabase.co
const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const url = rawUrl
  ?.trim()
  .replace(/\/(rest|auth|storage|realtime)\/v1\/?$/, "")
  .replace(/\/+$/, "");
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const supabase = url && anonKey ? createClient(url, anonKey) : null;
