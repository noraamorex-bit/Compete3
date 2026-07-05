import { useState } from "react";
import Modal from "./Modal.jsx";
import { CloudIcon } from "./Icons.jsx";

const STATUS_LABEL = {
  syncing: "Syncing…",
  synced: "Synced",
  error: "Sync error — will retry on next change",
  signedout: "Not signed in",
  unconfigured: "Cloud sync not configured",
};

/** Sign-in / account modal for cloud sync. */
export default function AccountMenu({ sync, onClose, notify }) {
  const { user, status, signIn, signOut, configured } = sync;
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim() || busy) return;
    setBusy(true);
    try {
      await signIn(email.trim());
      setSent(true);
    } catch {
      notify("Couldn't send the link — check the email address");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal title="Cloud sync" onClose={onClose}>
      <div className="mb-5 flex items-center gap-3">
        <span
          className={`grid h-10 w-10 place-items-center rounded-xl ${
            status === "synced"
              ? "bg-leaf/10 text-leaf"
              : status === "error"
                ? "bg-ember/10 text-ember"
                : "bg-ink/5 text-ink-soft dark:bg-white/5 dark:text-night-soft"
          }`}
        >
          <CloudIcon size={19} />
        </span>
        <div>
          <p className="font-display text-[15px] font-bold tracking-tight">
            {user ? user.email : "Sync across your devices"}
          </p>
          <p className="text-[13px] text-ink-soft dark:text-night-soft">{STATUS_LABEL[status]}</p>
        </div>
      </div>

      {!configured ? (
        <p className="text-[14px] leading-relaxed text-ink-soft dark:text-night-soft">
          This deployment doesn't have Supabase keys yet, so your data lives on
          this device only (export/import still works). The site owner can enable
          sync by adding <code className="font-mono text-[12.5px]">VITE_SUPABASE_URL</code> and{" "}
          <code className="font-mono text-[12.5px]">VITE_SUPABASE_ANON_KEY</code> — see{" "}
          <code className="font-mono text-[12.5px]">supabase/schema.sql</code> in the repo.
        </p>
      ) : user ? (
        <>
          <p className="text-[14px] leading-relaxed text-ink-soft dark:text-night-soft">
            Your competitions sync automatically to your account. Sign in with the
            same email on any device to see them there.
          </p>
          <div className="mt-5 flex justify-end">
            <button onClick={() => signOut()} className="btn-quiet">Sign out</button>
          </div>
        </>
      ) : sent ? (
        <p className="text-[14px] leading-relaxed text-ink-soft dark:text-night-soft">
          Magic link sent to <strong>{email}</strong> — open it on this device to
          finish signing in. You can close this window.
        </p>
      ) : (
        <form onSubmit={submit}>
          <p className="mb-4 text-[14px] leading-relaxed text-ink-soft dark:text-night-soft">
            Enter your email and we'll send a sign-in link. Your local data is
            kept and merged with your account.
          </p>
          <label className="field-label" htmlFor="sync-email">Email</label>
          <input
            id="sync-email"
            type="email"
            required
            className="field"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <div className="mt-5 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn-quiet">Cancel</button>
            <button type="submit" disabled={busy} className="btn-primary">
              {busy ? "Sending…" : "Send magic link"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
