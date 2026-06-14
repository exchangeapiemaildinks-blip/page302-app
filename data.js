/*
 * data.js — Page 302 data layer
 * -----------------------------------------------------------------------------
 * This is the ONLY file that knows where match data comes from.
 * Everything else in the app calls Data.getFeed() and doesn't care
 * whether the data is mock or live.
 *
 * RIGHT NOW: returns mock WORLD CUP 2026 data (real fixtures for the current
 * matchday) so the app works in your browser today with zero setup. Scores for
 * finished games are real results; upcoming games show kickoff times (UK/BST).
 *
 * LATER (when you have a backend): replace the body of fetchLive() with a
 * single fetch() to YOUR backend, which in turn calls football-data.org.
 * Do NOT call football-data.org directly from the browser:
 *   - it blocks browser (CORS) requests, and
 *   - it would expose your API key to anyone who views source.
 *
 * Your backend should hit (World Cup competition code = WC):
 *   GET https://api.football-data.org/v4/competitions/WC/matches
 *   GET https://api.football-data.org/v4/competitions/WC/standings
 *   header:  X-Auth-Token: <your key>
 * ...then reshape into the { competition, subtitle, matches, table } shape
 * below and serve it from e.g. GET https://your-backend/feed
 *
 * (Championship code is ELC — the app is league-agnostic, so to switch leagues
 *  you only change this file.)
 *
 * football-data.org status values map like so:
 *   SCHEDULED / TIMED -> upcoming (show kickoff time)
 *   IN_PLAY           -> live
 *   PAUSED            -> live (half-time)
 *   FINISHED          -> FT
 * -----------------------------------------------------------------------------
 */

const Data = (() => {
  // ---- CONFIG -------------------------------------------------------------
  const USE_LIVE = false;
  const BACKEND_URL = 'https://your-backend.example.com/feed';

  // ---- MOCK DATA: WORLD CUP 2026, matchday around 14 June ------------------
  // Times are UK time (BST). Finished scores are real results.
  function mockWorldCup() {
    return {
      competition: 'WORLD CUP',
      subtitle: 'GROUP STAGE',
      matches: [
        { home: 'HAITI',        away: 'SCOTLAND', hs: 0, as: 1, status: 'FINISHED', group: 'C',
          scorers: { home: [], away: ['MCTOMINAY 57'] } },
        { home: 'AUSTRALIA',    away: 'TURKIYE',  hs: 2, as: 0, status: 'FINISHED', group: 'D',
          scorers: { home: ['DUKE 31', 'IRVINE 66'], away: [] } },
        { home: 'GERMANY',      away: 'CURACAO',  hs: 0, as: 0, status: 'IN_PLAY', minute: 38, group: 'E',
          scorers: { home: [], away: [] } },
        { home: 'NETHERLANDS',  away: 'JAPAN',    hs: 0, as: 0, status: 'TIMED', kickoff: '20:00', group: 'F' },
        { home: 'COTE DIVOIRE', away: 'ECUADOR',  hs: 0, as: 0, status: 'TIMED', kickoff: '23:00', group: 'E' }
      ],
      table: [
        { group: 'C', name: 'SCOTLAND',     p: 1, gd: '+1', pts: 3 },
        { group: 'C', name: 'BRAZIL',       p: 1, gd: '0',  pts: 1 },
        { group: 'C', name: 'MOROCCO',      p: 1, gd: '0',  pts: 1 },
        { group: 'C', name: 'HAITI',        p: 1, gd: '-1', pts: 0 },
        { group: 'D', name: 'USA',          p: 1, gd: '+3', pts: 3 },
        { group: 'D', name: 'AUSTRALIA',    p: 1, gd: '+2', pts: 3 },
        { group: 'D', name: 'PARAGUAY',     p: 1, gd: '-3', pts: 0 },
        { group: 'D', name: 'TURKIYE',      p: 1, gd: '-2', pts: 0 },
        { group: 'E', name: 'GERMANY',      p: 0, gd: '0',  pts: 0 },
        { group: 'E', name: 'CURACAO',      p: 0, gd: '0',  pts: 0 },
        { group: 'E', name: 'COTE DIVOIRE', p: 0, gd: '0',  pts: 0 },
        { group: 'E', name: 'ECUADOR',      p: 0, gd: '0',  pts: 0 }
      ]
    };
  }

  // ---- LIVE FETCH (wire up later) ----------------------------------------
  async function fetchLive() {
    const res = await fetch(BACKEND_URL, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error('backend ' + res.status);
    return await res.json(); // must match { competition, subtitle, matches, table }
  }

  // ---- PUBLIC API ---------------------------------------------------------
  async function getFeed() {
    if (USE_LIVE) {
      try { return await fetchLive(); }
      catch (e) { console.warn('live fetch failed, falling back to mock:', e); return mockWorldCup(); }
    }
    await new Promise((r) => setTimeout(r, 250));
    return mockWorldCup();
  }

  return { getFeed, USE_LIVE };
})();
