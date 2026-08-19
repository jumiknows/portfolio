# Product / UX notes

## Non-negotiables

1. **No layout shift between chapters.** The app shell owns `100dvh`; content changes inside a fixed dossier.
2. **No nested content scroll in the main experience.** Each chapter is edited to fit. Only deliberate case-study sheets may scroll.
3. **No disappearing mobile navigation.** The bottom dock is persistent and safe-area aware.
4. **No custom cursor.** Native cursor behavior is preserved.
5. **No microscopic controls.** Primary controls are 44px or larger.
6. **3D is enhancement, never prerequisite.** Content remains legible if WebGL fails or reduced motion is enabled.
7. **One metaphor.** Everything belongs to the field-dossier / engineering-notebook world.

## Responsive target sizes checked in the static layout harness

- 1366 × 768 laptop
- 390 × 844 modern phone
- 375 × 667 short phone

The `design/` folder contains static layout screenshots. They do not render the actual Three.js scene; they validate typography, density, hit targets, and the no-scroll composition independently of WebGL.
