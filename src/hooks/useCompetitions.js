import { useCallback, useEffect, useState } from "react";
import { loadCompetitions, saveCompetitions } from "../lib/storage.js";
import { isPast, nextYearly } from "../lib/date.js";

/** Yearly competitions whose deadline passed roll forward to next year's edition. */
const rollRecurring = (list) =>
  list.map((c) =>
    c.repeatsYearly && isPast(c.deadline)
      ? { ...c, deadline: nextYearly(c.deadline) }
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
      createdAt: new Date().toISOString(),
    };
    setCompetitions((list) => [item, ...list]);
    return item;
  }, []);

  const update = useCallback((id, patch) => {
    setCompetitions((list) =>
      list.map((c) => (c.id === id ? { ...c, ...patch } : c))
    );
  }, []);

  const remove = useCallback((id) => {
    setCompetitions((list) => list.filter((c) => c.id !== id));
  }, []);

  const toggleFavorite = useCallback((id) => {
    setCompetitions((list) =>
      list.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c))
    );
  }, []);

  /** Merge a backup: imported items win on id clashes, new ones are appended. */
  const importAll = useCallback((items) => {
    setCompetitions((list) => {
      const map = new Map(list.map((c) => [c.id, c]));
      for (const item of items) map.set(item.id, item);
      return rollRecurring([...map.values()]);
    });
  }, []);

  return { competitions, add, update, remove, toggleFavorite, importAll };
}
