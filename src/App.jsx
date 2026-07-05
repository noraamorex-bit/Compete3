import { useCallback, useDeferredValue, useMemo, useRef, useState } from "react";
import Header from "./components/Header.jsx";
import Spotlight from "./components/Spotlight.jsx";
import FilterBar from "./components/FilterBar.jsx";
import CompetitionCard from "./components/CompetitionCard.jsx";
import CompetitionForm from "./components/CompetitionForm.jsx";
import CompetitionDetails from "./components/CompetitionDetails.jsx";
import ConfirmDialog from "./components/ConfirmDialog.jsx";
import EmptyState from "./components/EmptyState.jsx";
import Explore from "./components/Explore.jsx";
import { useCompetitions } from "./hooks/useCompetitions.js";
import { useTheme } from "./hooks/useTheme.js";
import { useNow } from "./hooks/useNow.js";
import { isClosingSoon, isPast, relativePhrase, timeLeft } from "./lib/date.js";
import { exportJSON, parseImport } from "./lib/transfer.js";
import { CLOSING_SOON_DAYS } from "./lib/constants.js";
import { CalendarIcon, ClockIcon, SparkIcon, StarIcon, TrophyIcon } from "./components/Icons.jsx";

const byDeadline = (a, b) => new Date(a.deadline) - new Date(b.deadline);
const byNewest = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
const byName = (a, b) => a.title.localeCompare(b.title);
const SORTERS = { deadline: byDeadline, name: byName, added: byNewest };

const NO_FILTERS = { category: null, favoritesOnly: false, mode: null, closingSoon: false };

/** Case-insensitive multi-word match: every word must appear somewhere. */
function matchesQuery(c, words) {
  if (!words.length) return true;
  const haystack = [c.title, c.organizer, c.location, c.prize, c.notes]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return words.every((w) => haystack.includes(w));
}

function Section({ icon: Icon, title, hint, children }) {
  return (
    <section className="animate-rise">
      <div className="mb-3.5 flex items-baseline gap-2.5">
        <span className="grid h-7 w-7 translate-y-1 place-items-center rounded-lg bg-ink/5 text-ink-soft dark:bg-white/5 dark:text-night-soft">
          <Icon size={15} />
        </span>
        <h2 className="font-display text-xl font-bold tracking-tight">{title}</h2>
        {hint && <span className="eyebrow translate-y-[-1px]">{hint}</span>}
        <span
          className="ml-2 hidden h-px flex-1 self-center bg-gradient-to-r from-ink/15 to-transparent dark:from-white/15 sm:block"
          aria-hidden="true"
        />
      </div>
      {children}
    </section>
  );
}

const Grid = ({ children }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
);

function Stat({ icon: Icon, value, label, hint, accent, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`card group flex flex-col items-start gap-2 px-4 py-3.5 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-lift active:scale-[.98] sm:flex-row sm:items-center sm:gap-3 ${
        active ? "ring-2 ring-marigold" : ""
      }`}
      aria-pressed={active}
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ring-1 ring-black/[0.04] transition-transform duration-200 group-hover:scale-110 dark:ring-white/10 sm:h-10 sm:w-10 ${accent}`}
      >
        <Icon size={18} />
      </span>
      <span className="min-w-0">
        <span
          className="block font-display text-[22px] font-bold leading-none tracking-tight"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {value}
        </span>
        <span className="mt-1 block text-[12px] font-medium leading-tight text-ink-soft dark:text-night-soft sm:truncate sm:text-[12.5px]">
          {label}
        </span>
        {hint && (
          <span className="mt-0.5 hidden truncate text-[11px] text-ink-faint dark:text-night-soft/60 sm:block">
            {hint}
          </span>
        )}
      </span>
    </button>
  );
}

export default function App() {
  const { competitions, add, update, remove, toggleFavorite, importAll } = useCompetitions();
  const { dark, toggle } = useTheme();
  const now = useNow(30000); // coarse clock — only section grouping needs it

  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query); // keeps typing snappy on big lists
  const [filters, setFilters] = useState(NO_FILTERS);
  const [detailsId, setDetailsId] = useState(null);
  const [formTarget, setFormTarget] = useState(null); // null | "new" | competition | catalog draft
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [sort, setSort] = useState("deadline");

  const [toast, setToast] = useState(null); // { msg, action?: { label, run } }
  const toastTimer = useRef(null);
  const notify = useCallback((msg, action = null) => {
    setToast({ msg, action });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), action ? 5500 : 3200);
  }, []);

  const filtering =
    Boolean(deferredQuery.trim()) || JSON.stringify(filters) !== JSON.stringify(NO_FILTERS);

  const visible = useMemo(() => {
    const words = deferredQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const { category, favoritesOnly, mode, closingSoon } = filters;
    return competitions.filter((c) => {
      if (category && c.category !== category) return false;
      if (favoritesOnly && !c.favorite) return false;
      // "hybrid" counts as both online and offline
      if (mode && c.mode !== mode && c.mode !== "hybrid") return false;
      if (closingSoon && !isClosingSoon(c.deadline, CLOSING_SOON_DAYS, now)) return false;
      return matchesQuery(c, words);
    });
  }, [competitions, deferredQuery, filters, now]);

  const counts = useMemo(() => {
    const map = {};
    for (const c of competitions) map[c.category] = (map[c.category] ?? 0) + 1;
    return map;
  }, [competitions]);

  const stats = useMemo(() => {
    const open = competitions.filter((c) => !isPast(c.deadline, now));
    const nextUp = [...open].sort(byDeadline)[0];
    return {
      total: competitions.length,
      totalHint: `${Object.keys(
        open.reduce((acc, c) => ((acc[c.category] = 1), acc), {})
      ).length} active categories`,
      soon: competitions.filter((c) => isClosingSoon(c.deadline, CLOSING_SOON_DAYS, now)).length,
      soonHint: nextUp ? `next: ${relativePhrase(nextUp.deadline, now)}` : "all caught up",
      favorites: competitions.filter((c) => c.favorite).length,
    };
  }, [competitions, now]);

  const sorter = SORTERS[sort] ?? byDeadline;
  const closingSoon = visible
    .filter((c) => isClosingSoon(c.deadline, CLOSING_SOON_DAYS, now))
    .sort(sorter);
  const upcoming = visible
    .filter((c) => timeLeft(c.deadline, now) > CLOSING_SOON_DAYS * 864e5)
    .sort(sorter);
  const closed = visible.filter((c) => isPast(c.deadline, now)).sort(sorter);
  if (sort === "deadline") closed.reverse(); // most recently closed first
  const recent = [...visible].sort(byNewest).slice(0, 3);
  const spotlight = [...closingSoon, ...upcoming][0] ?? null;

  const details = competitions.find((c) => c.id === detailsId) ?? null;

  // Stable callbacks so memoized cards don't re-render needlessly.
  const openDetails = useCallback((c) => setDetailsId(c.id), []);
  const openEdit = useCallback((c) => setFormTarget(c), []);
  const askDelete = useCallback((c) => setDeleteTarget(c), []);

  const handleSave = (data) => {
    // Catalog drafts carry an id that isn't in the list yet — treat as new.
    if (formTarget === "new" || !competitions.some((c) => c.id === formTarget.id)) {
      const item = add(data);
      setDetailsId(item.id);
    } else {
      update(formTarget.id, data);
      setDetailsId(formTarget.id);
    }
    setFormTarget(null);
  };

  const handleDelete = () => {
    const item = deleteTarget;
    remove(item.id);
    setDeleteTarget(null);
    setDetailsId(null);
    notify(`Deleted “${item.title}”`, { label: "Undo", run: () => importAll([item]) });
  };

  const clearFilters = () => {
    setQuery("");
    setFilters(NO_FILTERS);
  };

  const handleExport = () => {
    exportJSON(competitions);
    notify(`Exported ${competitions.length} competition${competitions.length === 1 ? "" : "s"}`);
  };

  const handleImportFile = async (file) => {
    try {
      const items = await parseImport(file);
      importAll(items);
      notify(`Imported ${items.length} competition${items.length === 1 ? "" : "s"}`);
    } catch {
      notify("Couldn't read that file — expected a Compete JSON backup");
    }
  };

  let cardIndex = 0;
  const renderCard = (c) => (
    <CompetitionCard
      key={c.id}
      competition={c}
      index={cardIndex++}
      onOpen={openDetails}
      onEdit={openEdit}
      onDelete={askDelete}
      onToggleFavorite={toggleFavorite}
    />
  );

  return (
    <div className="min-h-dvh pb-20">
      <Header
        query={query}
        onQuery={setQuery}
        dark={dark}
        onToggleTheme={toggle}
        onAdd={() => setFormTarget("new")}
        onExplore={() => setExploreOpen(true)}
        onExport={handleExport}
        onImportFile={handleImportFile}
      />

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pt-6 sm:px-6 sm:pt-8">
        {!filtering && (
          <Spotlight competition={spotlight} onOpen={openDetails} />
        )}

        {!filtering && competitions.length > 0 && (
          <div className="grid grid-cols-3 gap-3 animate-rise max-sm:-mt-2">
            <Stat
              icon={TrophyIcon}
              value={stats.total}
              label="Tracked"
              hint={stats.totalHint}
              accent="bg-ink/5 text-ink-soft dark:bg-white/5 dark:text-night-soft"
              active={false}
              onClick={clearFilters}
            />
            <Stat
              icon={ClockIcon}
              value={stats.soon}
              label="Closing soon"
              hint={stats.soonHint}
              accent="bg-ember/10 text-ember"
              active={filters.closingSoon}
              onClick={() => setFilters((f) => ({ ...f, closingSoon: !f.closingSoon }))}
            />
            <Stat
              icon={StarIcon}
              value={stats.favorites}
              label="Favorites"
              hint={stats.favorites ? "your starred picks" : "tap ☆ on a card"}
              accent="bg-marigold/15 text-marigold-deep dark:text-marigold"
              active={filters.favoritesOnly}
              onClick={() => setFilters((f) => ({ ...f, favoritesOnly: !f.favoritesOnly }))}
            />
          </div>
        )}

        <FilterBar filters={filters} onChange={setFilters} counts={counts} sort={sort} onSort={setSort} />

        {visible.length === 0 ? (
          <EmptyState
            filtered={filtering}
            onAdd={() => setFormTarget("new")}
            onClear={clearFilters}
            onExplore={() => setExploreOpen(true)}
          />
        ) : (
          <>
            {closingSoon.length > 0 && (
              <Section icon={ClockIcon} title="Closing soon" hint={`within ${CLOSING_SOON_DAYS} days`}>
                <Grid>{closingSoon.map(renderCard)}</Grid>
              </Section>
            )}

            {upcoming.length > 0 && (
              <Section icon={CalendarIcon} title="Upcoming">
                <Grid>{upcoming.map(renderCard)}</Grid>
              </Section>
            )}

            {!filtering && recent.length > 0 && (
              <Section icon={SparkIcon} title="Recently added">
                <Grid>{recent.map(renderCard)}</Grid>
              </Section>
            )}

            {closed.length > 0 && (
              <Section icon={ClockIcon} title="Closed" hint="past deadlines">
                <Grid>{closed.map(renderCard)}</Grid>
              </Section>
            )}
          </>
        )}
      </main>

      <footer className="safe-bottom mx-auto max-w-6xl px-4 pt-16 text-center sm:px-6">
        <p className="wordmark text-[16px]">Compete</p>
        <p className="mt-1 text-[12.5px] text-ink-faint/80 dark:text-night-soft/50">
          Your deadlines, all in one place · data stays on this device
        </p>
      </footer>

      {details && !formTarget && (
        <CompetitionDetails
          competition={details}
          onClose={() => setDetailsId(null)}
          onEdit={openEdit}
          onDelete={askDelete}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {exploreOpen && !formTarget && (
        <Explore
          onClose={() => setExploreOpen(false)}
          onPick={(draft) => {
            setExploreOpen(false);
            setFormTarget(draft);
          }}
          trackedIds={new Set(competitions.map((c) => c.catalogId).filter(Boolean))}
        />
      )}

      {formTarget && (
        <CompetitionForm
          initial={formTarget === "new" ? null : formTarget}
          isDraft={
            formTarget !== "new" && !competitions.some((c) => c.id === formTarget.id)
          }
          onSave={handleSave}
          onClose={() => setFormTarget(null)}
        />
      )}

      {toast && (
        <div
          role="status"
          className={`fixed bottom-6 left-1/2 z-50 flex max-w-[92vw] -translate-x-1/2 items-center gap-3 animate-pop rounded-full bg-ink py-2 pl-4 text-[13.5px] font-semibold text-white shadow-lift dark:bg-night-text dark:text-night ${
            toast.action ? "pr-2" : "pr-4"
          }`}
        >
          <span className="truncate">{toast.msg}</span>
          {toast.action && (
            <button
              onClick={() => {
                clearTimeout(toastTimer.current);
                toast.action.run();
                setToast(null);
              }}
              className="shrink-0 rounded-full bg-white/15 px-3 py-1 font-bold text-marigold transition hover:bg-white/25 dark:bg-night/10 dark:text-marigold-deep dark:hover:bg-night/20"
            >
              {toast.action.label}
            </button>
          )}
        </div>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete competition"
          message={`"${deleteTarget.title}" will be removed from your list. This can't be undone.`}
          confirmLabel="Delete"
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
