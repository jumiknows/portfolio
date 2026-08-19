# Ernest Wong: Field Notes v3.1

A high-polish portfolio built around one interaction model: a physical engineering dossier with five chapters: Index, Work, Lab, Space, and People.

## Stack

- React + TypeScript
- Vite
- Three.js through React Three Fiber
- Drei helpers for lightweight 3D primitives
- Motion for page transitions and mobile swipe gestures
- GitHub Pages deployment

## Why the 3D layer is not the UI

The Three.js canvas is intentionally atmospheric. Navigation, text, links, buttons, case-study sheets, and the CleanListen/release controls remain semantic DOM so they stay sharp, accessible, keyboard-friendly, and easy to use on mobile.

The 3D scene changes with each chapter:

- **Index:** orbital map tying together production, ML, space, and community
- **Work:** an eight-environment infrastructure topology with a moving release pulse
- **Lab:** noisy line fragments physically reorganize when CleanListen is toggled
- **Space:** an animated satellite orbit and star field
- **People:** a human-network constellation behind a physical sticky note

## Mobile interaction

The mobile version is not a shrunken desktop page.

- The dossier fills the viewport.
- The visual occupies the upper portion and the case summary occupies the lower portion.
- Swipe left/right anywhere on the dossier to move between chapters.
- A persistent bottom chapter dock remains visible at all times.
- 44px+ interactive targets are maintained for primary controls.
- Edge arrows provide a discoverable alternative to swiping.
- A one-time swipe hint appears on first load.
- Longer technical explanations live in an explicit case-file sheet instead of making the main interface scroll.


## Interaction polish

- Desk lamp mode is restored and persists between visits.
- Interface sound is opt-in and off by default. It uses short Web Audio tones, so there are no audio assets or autoplay requests.
- Desktop shows a visible `1-5` and arrow-key shortcut hint.
- Mobile keeps the swipe hint and persistent chapter dock.
- The build runs a quality check that rejects em dashes and en dashes in visible source, and verifies the key interaction hints are still present.

## Run locally

```bash
npm install
npm run dev
```

The first `npm install` will generate `package-lock.json`. Commit that lockfile once generated for reproducible installs.

## Build

```bash
npm run build
npm run preview
```

## GitHub Pages

The included workflow intentionally does **not** enable `setup-node` npm caching, so a missing lockfile cannot trigger the error from the previous portfolio workflow. It runs `npm install`, builds Vite, and deploys `dist/`.

Once `package-lock.json` is committed, you can optionally change the install step to `npm ci`.

## Keyboard

- `←` / `→` switches chapters
- `1` through `5` jumps directly to a chapter
- `Esc` closes an open case file

## Performance choices

- Three.js DPR is capped at 1.5.
- The scenes use simple geometry instead of heavy downloaded 3D models.
- WebGL is decorative and does not block page interaction.
- `prefers-reduced-motion` removes animated motion.
- Main chapters do not scroll on desktop or mobile; progressive disclosure handles deep detail.
