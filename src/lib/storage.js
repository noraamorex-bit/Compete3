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

export function loadCompetitions() {
  let list = null;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) list = JSON.parse(raw);
  } catch {
    // Corrupt data — start fresh rather than crash.
  }

  const firstRun = list === null;
  const current = list ?? [];
  const seen = loadSeen();
  const trackedIds = new Set(current.map((c) => c.catalogId).filter(Boolean));
  const trackedTitles = new Set(current.map((c) => (c.title || "").toLowerCase()));

  const additions = CATALOG.filter(
    (e) =>
      !seen.has(e.id) &&
      !trackedIds.has(e.id) &&
      !trackedTitles.has(e.title.toLowerCase())
  ).map((e, i) => toCompetition(e, { favorite: firstRun && i < 2 }));

  markAllSeen();
  const merged = additions.length ? [...current, ...additions] : current;
  if (additions.length || firstRun) saveCompetitions(merged);
  return merged;
}

export function saveCompetitions(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // Storage full or unavailable; the app keeps working in memory.
  }
}

