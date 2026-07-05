import { downloadBlob } from "./download.js";

const icsDate = (iso) =>
  new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

const esc = (s) =>
  String(s)
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");

/** RFC 5545 line folding: continuation lines start with a space. */
const fold = (line) => {
  const out = [];
  while (line.length > 74) {
    out.push(line.slice(0, 74));
    line = " " + line.slice(74);
  }
  out.push(line);
  return out;
};

/** Download an .ics file so the deadline shows up in any calendar app. */
export function downloadICS(c) {
  const description = [
    c.organizer && `Organizer: ${c.organizer}`,
    c.prize && `Prize: ${c.prize}`,
    c.registrationLink && `Register: ${c.registrationLink}`,
    c.notes,
  ]
    .filter(Boolean)
    .join("\n");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Compete//Competition Tracker//EN",
    "BEGIN:VEVENT",
    `UID:${c.id}@compete`,
    `DTSTAMP:${icsDate(new Date().toISOString())}`,
    `DTSTART:${icsDate(c.deadline)}`,
    `SUMMARY:${esc(`${c.title} — registration deadline`)}`,
    description && `DESCRIPTION:${esc(description)}`,
    c.website && `URL:${esc(c.website)}`,
    c.location && `LOCATION:${esc(c.location)}`,
    c.repeatsYearly && "RRULE:FREQ=YEARLY",
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    `DESCRIPTION:${esc(c.title)} — deadline tomorrow`,
    "TRIGGER:-P1D",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .flatMap(fold);

  const slug =
    c.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") ||
    "competition";
  downloadBlob(
    `${slug}.ics`,
    new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" })
  );
}
