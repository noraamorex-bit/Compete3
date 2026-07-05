# Compete 🏆

One beautiful place to save competitions you find online and never miss a deadline again.

Built for students — olympiads, hackathons, MUNs, quizzes, essays and more, all tracked with live countdowns. No accounts, no backend: your data lives in your browser.

## Features

- Dashboard with a "next deadline" spotlight and live countdowns
- Closing soon / Upcoming / Recently added / Closed sections
- Add, edit and delete competitions (title, organizer, category, deadline, website, registration link, online/offline/hybrid, location, prize, notes)
- Search across everything
- Category filters and favorites
- Urgency meter on every card
- Dark mode (follows your system, toggleable)
- Fully responsive — great on phones

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Build for production

```bash
npm run build
npm run preview
```

The `dist/` folder is a static site — deploy it anywhere (GitHub Pages, Netlify, Vercel).

## Stack

Vite · React 18 · Tailwind CSS. No other runtime dependencies. Data persists in `localStorage`.

## Project structure

```
src/
├── App.jsx                    # Dashboard, sections, filtering, modals
├── components/
│   ├── Header.jsx             # Logo, search, theme toggle, add button
│   ├── Spotlight.jsx          # Next-deadline hero with live countdown
│   ├── CategoryFilter.jsx     # Category chips + favorites toggle
│   ├── CompetitionCard.jsx    # Card with countdown + urgency meter
│   ├── CompetitionForm.jsx    # Add / edit modal
│   ├── CompetitionDetails.jsx # Full details modal
│   ├── ConfirmDialog.jsx      # Delete confirmation
│   ├── EmptyState.jsx
│   ├── Modal.jsx
│   ├── Countdown.jsx
│   └── Icons.jsx              # Hand-drawn SVG icon set
├── hooks/
│   ├── useCompetitions.js     # CRUD + persistence
│   ├── useTheme.js            # Dark mode
│   └── useNow.js              # Ticking clock for countdowns
└── lib/
    ├── constants.js           # Categories, modes
    ├── date.js                # Countdown & formatting helpers
    └── storage.js             # localStorage + first-run sample data
```

## License

MIT — use it, fork it, star it ⭐

## Cloud sync (optional)

Compete works fully offline. To sync across devices:

1. Create a free project at [supabase.com](https://supabase.com).
2. In the dashboard, open **SQL Editor → New query**, paste the contents of `supabase/schema.sql`, and run it.
3. In **Authentication → URL Configuration**, set the Site URL to your deployed app (e.g. `https://compete3.vercel.app`).
4. Copy **Project Settings → API** values into env vars wherever the app builds:
   - Vercel: Project → Settings → Environment Variables → add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, then redeploy.
   - GitHub Pages: repo → Settings → Secrets and variables → Actions → add the same two names as secrets.
5. Open the app, tap the cloud icon, and sign in with a magic link.

Local data is preserved and merged into the account on first sign-in.
