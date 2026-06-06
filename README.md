# MedTrack Demo

A Supabase-backed medication tracking demo for managing medicines, daily dose checkoffs, shared public viewing, and editor access.

## Features

- Add medication with dosage, treatment start date, duration, dose times, and notes
- Edit each medication's treatment start date so progress can show the right treatment day
- Mark today's doses as taken
- View daily adherence progress
- View per-medication treatment progress
- Delete medication
- Reset today's checkoffs
- Export synced JSON backup
- Sign in with Supabase Auth
- Public read-only care space
- Request and approve editor access

## Data Storage

The app is still static for GitHub Pages, but data now syncs through Supabase:

- Supabase Auth handles accounts
- Postgres stores care spaces, medicines, dose logs, members, and access requests
- Row Level Security controls public reads and editor/admin writes
- The frontend only contains the public Supabase URL and publishable key
- Signup confirmation emails redirect back to `https://everythingisimportant.github.io/medtrack-demo/`, even when signup is tested from localhost.

## Supabase Auth URL Configuration

In Supabase Auth settings, keep the public app URL allowlisted so confirmation emails can return to the deployed app:

```text
https://everythingisimportant.github.io/medtrack-demo/
```

If that URL is not in the Auth redirect allowlist, Supabase may reject the signup redirect or fall back to the project Site URL.

For a production version, the next steps would be reminder delivery, audit history, invite links, and stricter medical/privacy review.

## Run Locally

Serve the folder so browser module/CDN behavior matches GitHub Pages.

```powershell
python -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.
