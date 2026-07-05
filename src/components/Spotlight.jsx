import { useNow } from "../hooks/useNow.js";
import { formatCountdown, formatDeadline } from "../lib/date.js";
import { categoryById } from "../lib/constants.js";
import { ClockIcon } from "./Icons.jsx";

/**
 * The hero: the single next deadline, front and centre, with a live
 * monospace countdown over a slow aurora. Ticks on its own clock so the
 * rest of the dashboard doesn't re-render every second.
 */
export default function Spotlight({ competition, onOpen }) {
  const now = useNow(1000);
  if (!competition) return null;
  const cat = categoryById(competition.category);

  return (
    <section className="animate-rise">
      {/* gradient hairline frame */}
      <div className="rounded-[30px] bg-gradient-to-br from-marigold/70 via-[#7C6CF6]/35 to-transparent p-px shadow-lift transition duration-300 hover:shadow-modal">
        <div className="group relative overflow-hidden rounded-[29px] bg-[#10173C] p-6 text-white sm:p-9">
          <div className="aurora aurora-a" aria-hidden="true" />
          <div className="aurora aurora-b" aria-hidden="true" />
          <div className="aurora aurora-c" aria-hidden="true" />
          <div className="dotgrid" aria-hidden="true" />

          <div className="relative flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <button onClick={() => onOpen(competition)} className="min-w-0 text-left">
              <p className="mb-3.5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/85 ring-1 ring-white/15 backdrop-blur">
                <ClockIcon size={14} className="text-marigold" /> Next deadline
              </p>
              <h2 className="truncate font-display text-[clamp(26px,4.5vw,38px)] font-bold leading-[1.08] tracking-tight underline-offset-4 transition group-hover:underline">
                {competition.title}
              </h2>
              <p className="mt-2 flex flex-wrap items-center gap-x-2 text-[15px] text-white/70">
                {competition.organizer && <span>{competition.organizer}</span>}
                {competition.organizer && <span className="opacity-40">·</span>}
                <span className="inline-flex items-center gap-1.5">
                  <i
                    className="h-2 w-2 rounded-full shadow-[0_0_10px_currentColor]"
                    style={{ background: cat.dot, color: cat.dot }}
                  />
                  {cat.label}
                </span>
              </p>
            </button>

            <div className="shrink-0 sm:text-right">
              <p
                className="bg-gradient-to-br from-[#FFE3B0] via-marigold to-[#F07A3B] bg-clip-text font-mono text-[clamp(34px,6vw,46px)] font-semibold leading-none tracking-tight text-transparent"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {formatCountdown(competition.deadline, now)}
              </p>
              <p className="mt-2.5 text-[13px] text-white/60">
                Closes {formatDeadline(competition.deadline)}
              </p>
              {competition.registrationLink && (
                <a
                  href={competition.registrationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn mt-4 hidden bg-white/10 !py-2 text-white ring-1 ring-white/25 backdrop-blur transition hover:bg-white/20 hover:ring-white/40 sm:inline-flex"
                >
                  Register now
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
