import { downloadBlob } from "./download.js";

/** Download the whole list as a JSON backup file. */
export function exportJSON(competitions) {
  const payload = {
    app: "compete",
    version: 1,
    exportedAt: new Date().toISOString(),
    competitions,
  };
  const stamp = new Date().toISOString().slice(0, 10);
  downloadBlob(
    `compete-backup-${stamp}.json`,
    new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" })
  );
}

/**
 * Read a backup file and return a clean list of competitions.
 * Accepts our export format or a bare array. Throws on anything unreadable.
 */
export async function parseImport(file) {
  const data = JSON.parse(await file.text());
  const list = Array.isArray(data) ? data : data?.competitions;
  if (!Array.isArray(list)) throw new Error("Not a Compete backup");

  const items = list
    .filter((c) => c && typeof c === "object" && c.title && c.deadline)
    .map((c) => ({
      ...c,
      id: typeof c.id === "string" ? c.id : crypto.randomUUID(),
      title: String(c.title),
      deadline: new Date(c.deadline).toISOString(),
      favorite: Boolean(c.favorite),
      repeatsYearly: Boolean(c.repeatsYearly),
      createdAt: c.createdAt ?? new Date().toISOString(),
    }));
  if (!items.length) throw new Error("No competitions in file");
  return items;
}
