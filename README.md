# Ernest Wong: Engineering Portfolio

Interactive portfolio for Ernest Wong, a software engineer and Computer Science student at Simon Fraser University.

## Featured work

- Production release automation at ISED
- ShareGuard, a local-first browser privacy extension
- Multimedia Systems Lab, interactive Java tools for audio and image algorithms
- CleanListen, an accessibility-focused PDF filtering project
- EAP Reporting Pipeline at Elections Canada
- ALEASAT and Balloon4 mission software with UBC Orbit and SFU SAT

The portfolio focuses on concrete engineering work, technical scope, measurable results, and the systems used to verify each project.

## Stack

- React and TypeScript
- Vite
- Custom canvas rendering
- CSS system diagrams and responsive layouts
- GitHub Pages

## Project structure

```text
src/
  content.ts                 Portfolio copy, links, projects, and skills
  components/                Page sections and interactive project UI
  MissionSystems.tsx         Canvas renderer
  styles.css                 Style entry point
  styles/
    tokens.css               Palette, type, spacing, and global rules
    header-hero.css          Header and introduction
    mission.css              Orbital systems panel
    workbench.css            Projects and demonstrations
    sections.css             About, recognition, skills, and contact
    responsive.css           Viewport and input adaptations
```

Most content updates belong in `src/content.ts`. Components own behavior and semantic markup. Style files own one visual concern each.

## Run locally

```bash
npm install
npm run dev
```

## Verify

```bash
npm run build
```

For the faster pre-commit check:

```bash
npm run check
```

## Deploy

Pushing to `main` triggers the GitHub Pages workflow.

The published site is available at [jumiknows.github.io/portfolio](https://jumiknows.github.io/portfolio/).
