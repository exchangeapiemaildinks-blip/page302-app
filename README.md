# Page 302 — Personal Testing Build (PWA)

A teletext-style World Cup 2026 scores app you can run on your iPhone today, with
no App Store, no Xcode, no developer account. It's a Progressive Web App (PWA):
a website that installs to your home screen and behaves like an app.

This is your **personal testing build** — the place to live with the product
and refine the feel before porting to React Native (Claude Code can help with
that step later).

---

## What's in here

| File | What it is |
|---|---|
| `index.html` | The whole app (UI + logic). |
| `data.js` | The data layer. Mock World Cup data now; one function to swap for your live backend later. |
| `sw.js` | Service worker — makes it installable / work offline. |
| `manifest.webmanifest` | App name, icon, colours for home-screen install. |
| `icon-192.png`, `icon-512.png` | Placeholder app icons (swap when you have a real mark). |

---

## Run it on your iPhone (the quick way)

The app needs to be served over HTTPS for the "install to home screen" and
share features to work fully. Two easy options:

**Option A — host it free (recommended)**
1. Drag this whole folder onto [netlify.com/drop](https://app.netlify.com/drop)
   (no account needed for a quick test) — you'll get a public HTTPS URL.
2. Open that URL in **Safari** on your iPhone.
3. Tap the **Share** icon → **Add to Home Screen**.
4. Launch it from your home screen — it runs full-screen, no browser chrome.

**Option B — run locally on your Mac, view on your phone**
1. In Terminal, from this folder: `python3 -m http.server 8080`
2. Find your Mac's local IP (System Settings → Wi-Fi → Details), e.g. `192.168.1.50`.
3. On your iPhone (same Wi-Fi), open `http://192.168.1.50:8080` in Safari.
   (Add-to-home-screen + native share need HTTPS, so Option A is better for the
   full experience, but this is fine for quick iteration.)

---

## What works right now

- All five pages: Index (301), Scores (302), Table (303), Fixtures (304), Live Ticker (305)
- **Classic mode toggle** — OFF = endless scroll, tap a match to reveal scorers;
  ON = pick league → auto-cycling Ceefax-style pages
- **Tuning-in boot sequence** — first open of the day, skipped if anything's live
- **Share this page** — uses the native iOS share sheet (the share buttons you
  liked from LiveScore). Falls back to image download on browsers without share.
- Runs on **mock World Cup 2026 data** (today's real fixtures), so it works offline with zero setup.

---

## Wiring up real live data (later)

You do NOT call football-data.org from the browser — it blocks browser requests
and would leak your API key. You need a tiny backend in between. When that's
ready, live data is a **one-function change**:

1. Build a backend (Node/Fastify — see the roadmap) that:
   - calls `https://api.football-data.org/v4/competitions/WC/matches` and
     `.../WC/standings` with your `X-Auth-Token`
   - reshapes the response into the `{ competition, subtitle, matches, table }` shape
     shown in `data.js`
   - serves it at e.g. `GET https://your-backend/championship`
2. In `data.js`, set `USE_LIVE = true` and `BACKEND_URL` to your endpoint.
3. Done — the rest of the app already calls the data layer and doesn't care.

`data.js` has the full football-data.org status mapping and request shape
documented inline.

---

## Known notes

- The 3·0·2 ident logo is a placeholder pixel rendering; refine when branding lands.
- Live "ticker" commentary is mock text for now — the real version generates
  one line per match event server-side (see roadmap).
- Icons are crude placeholders generated for testing.
