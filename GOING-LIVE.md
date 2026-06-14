# Going Live — Get Page 302 onto a shareable link

Goal: one public HTTPS link that you and your mates can open on any phone,
add to your home screens, and use to follow the World Cup.

Total time: about 5 minutes, done once, on a computer (Netlify's drag-and-drop
deploy doesn't work well on mobile — but once it's deployed, *using* the app is
100% mobile).

---

## Step 1 — Get the files onto your Mac

Download **`page302-app.zip`** from this chat, then unzip it (double-click in
Finder). You should end up with a folder containing:

```
page302-app/
  index.html
  manifest.webmanifest
  sw.js
  icon-192.png
  icon-512.png
  data.js
  README.md
```

## Step 2 — Deploy it (drag and drop, no account needed)

1. Open **[app.netlify.com/drop](https://app.netlify.com/drop)** in a browser
   on your Mac.
2. Drag the whole **`page302-app`** folder onto the page.
3. Wait a few seconds — Netlify will give you a live URL, something like:
   `https://random-name-123456.netlify.app`

That's it. The site is now live on HTTPS, which is what's needed for
"Add to Home Screen" and the share sheet to work properly.

> **Optional but recommended**: click "Claim this site" / sign up for a free
> Netlify account (email or GitHub login). This lets you rename the URL to
> something memorable (e.g. `page302.netlify.app`) and — important for
> later — **redeploy updates** by dragging a new folder onto the same site,
> so the link your friends already have keeps working when you make changes.

## Step 3 — Install it on your iPhone

1. Open your new URL in **Safari** (must be Safari, not Chrome, for the
   install step on iOS).
2. Tap the **Share** icon (square with arrow, bottom toolbar).
3. Scroll down, tap **Add to Home Screen**.
4. Tap **Add**.

You'll now have a "302" icon on your home screen that opens full-screen, no
browser bars — looks and feels like a real app.

## Step 4 — Send it to your mates

Just send them the URL (text message, WhatsApp, whatever). They do exactly
Step 3 on their own phones — open the link in Safari, Add to Home Screen.
No App Store, no install, no accounts.

---

## What everyone will see

- Real fixtures from today's World Cup matches (Haiti–Scotland, Australia–Türkiye,
  Germany–Curaçao, Netherlands–Japan, Côte d'Ivoire–Ecuador), grouped by group.
- The live Germany–Curaçao match gently ticks forward and occasionally scores,
  so it feels alive — but this is a **simulation**, not the real live score.
- Classic mode, scorers, the live ticker, the boot sequence, and the share
  button all work as built.

**Set expectations**: the scores are realistic but not real-time-accurate —
this is the personal-testing build, not the live-data version. That's fine for
"try this out, what do you think" with mates; it's not yet the "checks real
scores" version (that needs the backend, which is a later step).

---

## When you make changes later

If you (or Claude Code) update `index.html` and want everyone's installed app
to get the update: go back to your Netlify site dashboard and drag the updated
folder onto the same site again. Anyone with it added to their home screen will
get the new version next time they open it (the service worker checks for
updates automatically).
