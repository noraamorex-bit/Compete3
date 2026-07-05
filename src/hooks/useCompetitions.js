import { useCallback, useEffect, useState } from "react";
import { loadCompetitions, recordPendingDelete, saveCompetitions } from "../lib/storage.js";
import { isPast, nextYearly } from "../lib/date.js";

const stamp = () => new Date().toISOString();

/** Yearly competitions whose deadline passed roll forward to next year's edition. */
const rollRecurring = (list) =>
  list.map((c) =>
    c.repeatsYearly && isPast(c.deadline)
      ? { ...c, deadline: nextYearly(c.deadline), updatedAt: stamp() }
      : c
  );

export function useCompetitions() {
  const [competitions, setCompetitions] = useState(() =>
    rollRecurring(loadCompetitions())
  );

  useEffect(() => {
    saveCompetitions(competitions);
  }, [competitions]);

  const add = useCallback((data) => {
    const item = {
      ...data,
      id: crypto.randomUUID(),
      favorite: false,
      createdAt: stamp(),
      updatedAt: stamp(),
    };
    setCompetitions((list) => [item, ...list]);
    return item;
  }, []);

  const update = useCallback((id, patch) => {
    setCompetitions((list) =>
      list.map((c) => (c.id === id ? { ...c, ...patch, updatedAt: stamp() } : c))
    );
  }, []);

  const remove = useCallback((id) => {
    recordPendingDelete(id); // so cloud sync deletes it remotely too
    setCompetitions((list) => list.filter((c) => c.id !== id));
  }, []);

  const toggleFavorite = useCallback((id) => {
    setCompetitions((list) =>
      list.map((c) =>
        c.id === id ? { ...c, favorite: !c.favorite, updatedAt: stamp() } : c
      )
    );
  }, []);

  /** Merge a backup: imported items win on id clashes, new ones are appended. */
  const importAll = useCallback((items) => {
    setCompetitions((list) => {
      const map = new Map(list.map((c) => [c.id, c]));
      for (const item of items) map.set(item.id, { ...item, updatedAt: stamp() });
      return rollRecurring([...map.values()]);
    });
  }, []);

  /** Replace the whole list (used by cloud sync after merging with remote). */
  const replaceAll = useCallback((list) => {
    setCompetitions(rollRecurring(list));
  }, []);

  return { competitions, add, update, remove, toggleFavorite, importAll, replaceAll };
}
