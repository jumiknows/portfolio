# Ernest Wong: Engineering Portfolio

An interactive engineering portfolio for Ernest Wong, a software engineer in Vancouver.

The site presents three concrete system stories:

- production engineering at ISED
- CleanListen, an accessible machine learning project
- mission software with UBC Orbit and SFU SAT

Current data work at Elections Canada, community leadership, technical skills, and contact links round out the story.

## Experience

- an animated orbital systems model with a flight node, ground station, and telemetry link
- engineering case files organized around architecture, constraints, ownership, and verification
- interactive release, machine learning, and flight software demonstrations
- responsive layouts and a reduced-motion mode

## Stack

- React and TypeScript
- Vite
- a lightweight custom canvas renderer
- CSS system diagrams and transitions
- GitHub Pages

## Run locally

```bash
npm install
npm run dev
```

## Verify

```bash
npm run build
```

The build runs a source quality check, TypeScript, and the production Vite bundle.

## Deploy

Pushing to `main` triggers the included GitHub Pages workflow. See [GITHUB_SETUP.md](./GITHUB_SETUP.md) for account connection and publishing steps.
