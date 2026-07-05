import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase.js";
import { clearPendingDeletes, loadPendingDeletes } from "../lib/storage.js";

const newer = (a, b) =>
  (a.updatedAt ?? a.createdAt ?? "") >= (b.updatedAt ?? b.createdAt ?? "");

/** Union of local + remote lists; the most recently updated copy of each id wins. */
function mergeLists(local, remote) {
  const map = new Map();
  for (const c of [...remote, ...local]) {
    const prev = map.get(c.id);
    if (!prev || newer(c, prev)) map.set(c.id, c);
  }
  return [...map.values()];
}

async function flushDeletes(userId) {
  const pending = loadPendingDeletes();
  if (pending.size) {
    const { error } = await supabase
      .from("competitions")
      .delete()
      .eq("user_id", userId)
      .in("id", [...pending]);
    if (error) throw error;
    clearPendingDeletes();
  }
  return pending;
}

async function pushAll(userId, list) {
  const rows = list.map((c) => ({
    id: c.id,
    user_id: userId,
    data: c,
    updated_at: c.updatedAt ?? c.createdAt ?? new Date().toISOString(),
  }));
  const { error } = await supabase.from("competitions").upsert(rows);
  if (error) throw error;
}

/**
 * Offline-first cloud sync. localStorage stays the source of truth; when a
 * user is signed in we merge remote rows in once, then debounce-push every
 * local change. status: "unconfigured" | "signedout" | "syncing" | "synced" | "error"
 */
export function useSync(competitions, replaceAll) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(supabase ? "signedout" : "unconfigured");
  const listRef = useRef(competitions);
  listRef.current = competitions;
  const hydrated = useRef(false);
  const pushTimer = useRef(null);

  // Track the auth session.
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // First sync after sign-in: flush queued deletes, pull, merge, push back.
  useEffect(() => {
    if (!supabase) return;
    if (!user) {
      hydrated.current = false;
      setStatus(supabase ? "signedout" : "unconfigured");
      return;
    }
    let cancelled = false;
    (async () => {
      setStatus("syncing");
      try {
        const deleted = await flushDeletes(user.id);
        const { data, error } = await supabase
          .from("competitions")
          .select("data")
          .eq("user_id", user.id);
        if (error) throw error;
        if (cancelled) return;
        const remote = data.map((r) => r.data).filter((c) => c && !deleted.has(c.id));
        const merged = mergeLists(listRef.current, remote);
        replaceAll(merged);
        await pushAll(user.id, merged);
        hydrated.current = true;
        if (!cancelled) setStatus("synced");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, replaceAll]);

  // Debounced push whenever the list changes after hydration.
  useEffect(() => {
    if (!supabase || !user || !hydrated.current) return;
    setStatus("syncing");
    clearTimeout(pushTimer.current);
    pushTimer.current = setTimeout(async () => {
      try {
        await flushDeletes(user.id);
        await pushAll(user.id, listRef.current);
        setStatus("synced");
      } catch {
        setStatus("error");
      }
    }, 1200);
    return () => clearTimeout(pushTimer.current);
  }, [competitions, user]);

  const signIn = useCallback(async (email) => {
    if (!supabase) throw new Error("Sync not configured");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + window.location.pathname },
    });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    await supabase?.auth.signOut();
  }, []);

  return { user, status, signIn, signOut, configured: Boolean(supabase) };
}
