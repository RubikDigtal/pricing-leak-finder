# Pricing Leak Finder

A freemium diagnostic web app for wedding photographers — six questions about
pricing behavior, a free diagnosis, and a $19 full "Prescription" with
scripts, templates, and a cheat sheet.

Built with React + Vite, Supabase (data), and Gumroad (payment + webhook).

## What's in this project

- `src/data/content.js` — the full content library: all 6 dimensions, 2
  compound pairings, 5 client archetypes, and the question set. This is
  where you'd edit report wording.
- `src/lib/scoring.js` — the ranking, confidence score, and client-type logic.
- `src/components/` — Landing page, Quiz flow, and the Report (free + paid).
- `api/gumroad-webhook.js` — the serverless function Gumroad calls on
  purchase, which unlocks the paid section for that submission.
- `supabase-schema.sql` — run this once in your Supabase project to create
  the table the app needs.

## Local setup

1. Install dependencies:
   ```
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your real Supabase project URL,
   anon key, and Gumroad product URL.
3. Run the Supabase schema: open your Supabase project → SQL Editor → paste
   the contents of `supabase-schema.sql` → Run.
4. Start the dev server:
   ```
   npm run dev
   ```

## Deploying

See `GITHUB_GUIDE.md` for the full step-by-step on getting this onto GitHub
and deployed via Vercel, including where the environment variables go.

## Configuring the Gumroad webhook

In your Gumroad product's settings, set the "Ping" / webhook URL to:

```
https://your-deployed-app.vercel.app/api/gumroad-webhook
```

The checkout link built by the app already passes the submission's id
through as a URL parameter — Gumroad forwards that back in the webhook
payload, which is how `api/gumroad-webhook.js` knows which row to unlock.

Set your Gumroad product's redirect URL (after purchase) to:

```
https://your-deployed-app.vercel.app/#/report?unlocked=1
```

(the app polls Supabase for a few seconds after landing back here, to give
the webhook time to fire before revealing the paid section)

## Editing report content

Everything a photographer reads — the leak explanations, prescriptions,
message templates, objection library — lives in `src/data/content.js` as
plain JavaScript objects. No component code needs to change to edit wording.

## Known scope notes

- PDF export captures the on-screen report as an image-based PDF via
  html2canvas + jsPDF. It's genuinely functional, but a from-scratch
  vector PDF (smaller file size, selectable text) would be a further
  upgrade if needed later.
- Tier-Building Strategy only renders when Anchoring is your Primary or
  Secondary Leak, matching the original content rule — it won't appear on
  every report, and that's intentional.
