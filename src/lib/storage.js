import { CATALOG, toCompetition } from "../data/catalog.js";

const KEY = "compete.competitions.v1";

export function loadCompetitions() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Corrupt data — start fresh rather than crash.
  }
  const seed = seedData();
  saveCompetitions(seed);
  return seed;
}

export function saveCompetitions(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // Storage full or unavailable; the app keeps working in memory.
  }
}

/**
 * First-run seed: a handful of flagship REAL competitions from the catalog,
 * with deadlines set to the next occurrence of their typical registration
 * window (each entry's notes say to verify exact dates). Delete freely —
 * the full catalog lives in Explore.
 */
const SEED_IDS = ["sof-nso", "ioqm", "tcs-it-wiz", "wro-india", "doodle-for-google", "green-olympiad"];

function seedData() {
  return SEED_IDS.map((id, i) =>
    toCompetition(CATALOG.find((e) => e.id === id), { favorite: i < 2 })
  );
}
