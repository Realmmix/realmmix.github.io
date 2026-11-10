# Realm — Server Developer Portfolio

Personal portfolio for **Realm** — Minecraft & Discord server development.
Live: https://realmmix.github.io/

## How it works

Single page, hash routing in `main.js` — links like `#/home`, `#/projects`,
`#/projects`, `#/contact` swap the `<main id="view">` content with a fade
transition. No reloads, no framework. "Pages" are just different URLs
rendering the same site differently — see `VIEWS` in `main.js`.

Theme: "The Obsidian Realm" — obsidian background, animated ember particles
(`#fx` canvas), gold accents, Cinzel + Space Mono.

## Deploy / update

    git add -A && git commit -m "update" && git push

Pages rebuilds in ~1–2 min. Settings: repo Settings → Pages → `main` / root.

## Structure

- `index.html` — shell: canvas, top bar, `<main id="view">`, footer
- `style.css` — obsidian theme, gold accents, route pill nav
- `main.js` — router + views + ember particle canvas
- `assets/favicon.svg` — crown

## Before sharing

- Discord handle is `n3v3rfr3v3r` — confirm it's what you want public.
- All project claims are real work; don't add invented ones.
