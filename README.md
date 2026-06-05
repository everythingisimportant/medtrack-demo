# MedTrack Demo

A static medication tracking demo for managing medicines, daily dose checkoffs, and treatment progress.

## Features

- Add medication with dosage, duration, dose times, and notes
- Mark today's doses as taken
- View daily adherence progress
- View per-medication treatment progress
- Delete medication
- Reset today's checkoffs
- Export, import, and clear local JSON data

## Data Storage

This demo is intentionally static for GitHub Pages. Data is stored only in each visitor's browser with `localStorage`.

- No backend database
- No account system
- No sync between Solar and Nguyet
- No medication data is sent to a server

For a production version, the next step would be a backend database with authentication, reminder delivery, audit history, and clear medical/privacy disclaimers.

## Run Locally

Open `index.html` directly in a browser.

```powershell
start .\index.html
```
