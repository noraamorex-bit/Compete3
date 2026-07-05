import { useMemo, useState } from "react";
import Modal from "./Modal.jsx";
import { CATALOG, MONTH_NAMES, regWindowLabel, toCompetition } from "../data/catalog.js";
import { CATEGORIES, categoryById } from "../lib/constants.js";
import { CalendarIcon, GlobeIcon, PinIcon, PlusIcon, TrophyIcon } from "./Icons.jsx";

const usedCategories = CATEGORIES.filter((c) => CATALOG.some((e) => e.category === c.id));

/**
 * Browsable catalog of real competitions for Classes 6–12 in India.
 * Filter by class, category, mode and typical registration month, then
 * track any entry — it opens the add form prefilled for final tweaks.
 */
export default function Explore({ onClose, onPick, trackedIds }) {
  const [q, setQ] = useState("");
  const [cls, setCls] = useState("");
  const [cat, setCat] = useState("");
  const [mode, setMode] = useState("");
  const [month, setMonth] = useState("");

  const results = useMemo(() => {
    const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return CATALOG.filter((e) => {
      if (cls && (Number(cls) < e.classes[0] || Number(cls) > e.classes[1])) return false;
      if (cat && e.category !== cat) return false;
      if (mode && e.mode !== mode && e.mode !== "hybrid") return false;
      if (month && !e.regMonths.includes(Number(month))) return false;
      if (words.length) {
        const hay = [e.title, e.organizer, e.description, e.prize, ...e.tags]
          .join(" ")
          .toLowerCase();
        if (!words.every((w) => hay.includes(w))) return false;
      }
      return true;
    });
  }, [q, cls, cat, mode, month]);

  return (
    <Modal title="Explore competitions" onClose={onClose} wide>
      <p className="-mt-1 mb-4 text-[13.5px] text-ink-soft dark:text-night-soft">
        {CATALOG.length} real, recurring competitions for Classes 6–12 in India.
        Dates shown are typical — always verify on the official site.
      </p>

      {/* filters */}
      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search…"
          className="field col-span-2 !min-h-[40px] !py-2 sm:col-span-4"
          aria-label="Search catalog"
        />
        <select value={cls} onChange={(e) => setCls(e.target.value)} className="field-select !min-h-[40px] !py-2" aria-label="Filter by class">
          <option value="">Any class</option>
          {[6, 7, 8, 9, 10, 11, 12].map((n) => (
            <option key={n} value={n}>Class {n}</option>
          ))}
        </select>
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="field-select !min-h-[40px] !py-2" aria-label="Filter by category">
          <option value="">All categories</option>
          {usedCategories.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
        <select value={mode} onChange={(e) => setMode(e.target.value)} className="field-select !min-h-[40px] !py-2" aria-label="Filter by mode">
          <option value="">Online & offline</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
        <select value={month} onChange={(e) => setMonth(e.target.value)} className="field-select !min-h-[40px] !py-2" aria-label="Filter by registration month">
          <option value="">Any month</option>
          {MONTH_NAMES.map((m, i) => (
            <option key={m} value={i + 1}>{m}</option>
          ))}
        </select>
      </div>

      {results.length === 0 ? (
        <p className="py-10 text-center text-[14px] text-ink-faint dark:text-night-soft">
          Nothing matches these filters.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {results.map((e) => {
            const c = categoryById(e.category);
            const tracked = trackedIds.has(e.id);
            return (
              <li
                key={e.id}
                className="rounded-2xl border border-ink/[0.07] bg-mist/60 p-4 transition hover:border-ink/15 dark:border-night-edge dark:bg-night/50 dark:hover:border-night-soft/40"
              >
                <div className="flex flex-wrap items-center gap-2 text-[12px] font-semibold">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
                    style={{ background: `${c.dot}1a`, color: c.dot }}
                  >
                    <i className="h-1.5 w-1.5 rounded-full" style={{ background: c.dot }} />
                    {c.label}
                  </span>
                  <span className="rounded-full bg-ink/5 px-2.5 py-1 text-ink-soft dark:bg-white/10 dark:text-night-soft">
                    Classes {e.classes[0]}–{e.classes[1]}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-ink/5 px-2.5 py-1 text-ink-soft dark:bg-white/10 dark:text-night-soft">
                    {e.mode === "online" ? <GlobeIcon size={12} /> : <PinIcon size={12} />}
                    {e.mode === "hybrid" ? "Hybrid" : e.mode === "online" ? "Online" : "Offline"}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-ink/5 px-2.5 py-1 text-ink-soft dark:bg-white/10 dark:text-night-soft">
                    <CalendarIcon size={12} /> Reg: {regWindowLabel(e)}
                  </span>
                </div>

                <h4 className="mt-2.5 font-display text-[16.5px] font-bold leading-snug tracking-tight">
                  {e.title}
                </h4>
                <p className="text-[13px] text-ink-soft dark:text-night-soft">{e.organizer}</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft dark:text-night-soft">
                  {e.description}
                </p>
                <p className="mt-1.5 inline-flex items-start gap-1.5 text-[13px] text-ink-soft dark:text-night-soft">
                  <TrophyIcon size={14} className="mt-0.5 shrink-0 text-marigold" /> {e.prize}
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <a
                    href={e.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[13px] font-semibold text-marigold-deep underline decoration-marigold/40 underline-offset-2 hover:decoration-marigold dark:text-marigold"
                  >
                    {e.website.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                  {tracked ? (
                    <span className="text-[13px] font-semibold text-leaf">✓ Tracked</span>
                  ) : (
                    <button onClick={() => onPick(toCompetition(e))} className="btn-primary !min-h-[36px] !px-3.5 !py-1.5 !text-[13px]">
                      <PlusIcon size={15} /> Track
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Modal>
  );
}
