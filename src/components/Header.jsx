import { useEffect, useRef } from "react";
import {
  CloseIcon, DownloadIcon, MoonIcon, PlusIcon, SearchIcon, SunIcon,
  TrophyIcon, UploadIcon,
} from "./Icons.jsx";

export default function Header({
  query, onQuery, dark, onToggleTheme, onAdd, onExport, onImportFile,
}) {
  const inputRef = useRef(null);
  const fileRef = useRef(null);

  // "/" focuses search from anywhere; Escape clears and leaves it.
  useEffect(() => {
    const onKey = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="glass-header sticky top-0 z-30 bg-white/55 backdrop-blur-2xl dark:bg-night/60">
      <div className="mx-auto flex max-w-6xl items-center gap-2.5 px-4 py-3 sm:gap-3 sm:px-6">
        <a href="#" className="group flex items-center gap-2.5" aria-label="Compete home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-marigold to-marigold-deep text-white shadow-[0_6px_14px_-6px_rgba(199,124,8,.6)] transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-105">
            <TrophyIcon size={18} />
          </span>
          <span className="wordmark hidden text-xl sm:block">Compete</span>
        </a>

        <label className="relative ml-auto w-full max-w-xs flex-1 sm:max-w-sm">
          <SearchIcon
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint dark:text-night-soft"
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                onQuery("");
                e.currentTarget.blur();
              }
            }}
            placeholder="Search competitions…"
            className="field !py-2 !pl-10 !pr-9 [&::-webkit-search-cancel-button]:hidden"
            aria-label="Search competitions"
          />
          {query ? (
            <button
              onClick={() => onQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-ink-faint transition hover:bg-ink/5 hover:text-ink dark:text-night-soft dark:hover:bg-white/10 dark:hover:text-night-text"
              aria-label="Clear search"
            >
              <CloseIcon size={14} />
            </button>
          ) : (
            <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-ink/10 bg-paper px-1.5 py-0.5 font-mono text-[11px] text-ink-faint dark:border-night-edge dark:bg-night-card dark:text-night-soft sm:block">
              /
            </kbd>
          )}
        </label>

        <button
          onClick={onExport}
          className="icon-btn hidden !h-10 !w-10 sm:grid"
          aria-label="Export backup"
          title="Export backup (JSON)"
        >
          <DownloadIcon size={18} />
        </button>

        <button
          onClick={() => fileRef.current?.click()}
          className="icon-btn hidden !h-10 !w-10 sm:grid"
          aria-label="Import backup"
          title="Import backup (JSON)"
        >
          <UploadIcon size={18} />
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onImportFile(file);
            e.target.value = ""; // allow re-importing the same file
          }}
        />

        <button
          onClick={onToggleTheme}
          className="icon-btn !h-10 !w-10"
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {dark ? <SunIcon size={19} /> : <MoonIcon size={19} />}
        </button>

        <button onClick={onAdd} className="btn-primary !px-3.5 sm:!px-4">
          <PlusIcon size={17} />
          <span className="hidden sm:inline">Add competition</span>
        </button>
      </div>
    </header>
  );
}
