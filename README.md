# ISON — Watch site

Static HTML/CSS/JS. No build step. Files:
- `index.html` Watch page (banner, rows, search, player, Ison Insiders signup)
- `about.html` About page
- `catalog.js` **the only file you edit**
- `app.js` page logic (don't touch), `style.css` styles, `assets/` images

## Add or release an episode
1. Upload the video to YouTube (Public or Unlisted).
2. Copy the ID: in `https://www.youtube.com/watch?v=AbC123xyz_0` the ID is `AbC123xyz_0`.
3. In `catalog.js`, find the episode and set `youtube: "AbC123xyz_0"` and `runtime: "4 min"`.
   Empty `youtube: ""` = shows "Coming soon".
4. New episode? Add another `{ title: "...", runtime: "...", youtube: "..." }` to that series' `episodes` list.
5. New short/trailer? Copy the commented example at the bottom of `catalog.js` (`type: "short"` or `"trailer"`).
6. Thumbnails: put a 16:9 JPG (1280x720) in `assets/` and point `thumb` at it.
7. Check locally: `python3 -m http.server 8000` then open http://localhost:8000

## Deploy free on Vercel
1. Make a free GitHub account, create a repo (e.g. `ison-site`), upload this folder's contents (drag-and-drop works in the GitHub web UI).
2. Go to vercel.com, sign in with GitHub, "Add New → Project", import the repo.
3. Framework preset: **Other**. No build command, output directory = root. Deploy.
4. Every later edit to `catalog.js` pushed to GitHub redeploys automatically.
5. Optional: add a custom domain under Project → Settings → Domains.

(GitHub Pages alternative: repo Settings → Pages → Deploy from branch `main`, folder `/`.)

## MailerLite
The Universal snippet (account 2755280) and form `Ff3SJx` are in `index.html`. In MailerLite, add your live domain to the allowed sites if the form doesn't appear. A fallback link to the hosted form is always shown.
