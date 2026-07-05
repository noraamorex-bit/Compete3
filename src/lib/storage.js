import { CATALOG, toCompetition } from "../data/catalog.js";

const KEY = "compete.competitions.v1";
const SEEN_KEY = "compete.catalogSeen.v1";

/*
 * Catalog entries are auto-tracked ONCE (per catalog id) so the home page
 * is full of real competitions out of the box. The "seen" list acts as a
 * tombstone: if the user deletes one, it never re-appears on its own —
 * they can still re-add it from Explore. New entries added to the catalog
 * later are merged in on the next load.
 */
function loadSeen() {
  try {
    return new Set(JSON.parse(localStorage.getItem(SEEN_KEY)) ?? []);
  } catch {
    return new Set();
  }
}

function markAllSeen() {
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify(CATALOG.map((e) => e.id)));
  } catch {
    // Storage unavailable; merge will simply retry next load.
  }
}

const norm = (s) => (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

/** Retired sample entries from early versions — removed if still untouched. */
const LEGACY_SAMPLES = new Set([norm("Smart India Hackathon — Junior"), norm("Google Code to Learn")]);

/** Map a tracked item to its catalog id via explicit id, title or alias. */
function catalogIdFor(item) {
  if (item.catalogId) return item.catalogId;
  const t = norm(item.title);
  const hit = CATALOG.find(
    (e) => norm(e.title) === t || (e.aliases ?? []).some((a) => norm(a) === t)
  );
  return hit?.id ?? null;
}

/**
 * One-time repair of stored data: drop retired samples, link items to their
 * catalog entry, and collapse duplicates of the same competition (keeping
 * the catalog-linked copy and preserving the favorite flag).
 */
function cleanupList(list) {
  const slot = new Map(); // dedupe key -> index in out
  const linked = new Map(); // dedupe key -> already had catalogId
  const out = [];
  for (const item of list) {
    const t = norm(item.title);
    if (!item.catalogId && LEGACY_SAMPLES.has(t)) continue;
    const catId = catalogIdFor(item);
    const key = catId ?? `title:${t}`;
    const pos = slot.get(key);
    if (pos === undefined) {
      slot.set(key, out.length);
      linked.set(key, Boolean(item.catalogId));
      out.push(catId ? { ...item, catalogId: catId } : item);
    } else {
      const favorite = out[pos].favorite || item.favorite;
      // Prefer the copy that came from the catalog — richer notes & links.
      if (item.catalogId && !linked.get(key)) {
        out[pos] = { ...item, favorite };
        linked.set(key, true);
      } else {
        out[pos] = { ...out[pos], favorite };
      }
    }
  }
  return out;
}

export function loadCompetitions() {
  let list = null;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) list = JSON.parse(raw);
  } catch {
    // Corrupt data — start fresh rather than crash.
  }

  const firstRun = list === null;
  const current = cleanupList(list ?? []);
  const seen = loadSeen();
  const trackedIds = new Set(current.map((c) => c.catalogId).filter(Boolean));

  const additions = CATALOG.filter(
    (e) => !seen.has(e.id) && !trackedIds.has(e.id)
  ).map((e, i) => toCompetition(e, { favorite: firstRun && i < 2 }));

  markAllSeen();
  const merged = additions.length ? [...current, ...additions] : current;
  if (firstRun || additions.length || merged.length !== (list ?? []).length) {
    saveCompetitions(merged);
  }
  return merged;
}

export function saveCompetitions(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // Storage full or unavailable; the app keeps working in memory.
  }
}

