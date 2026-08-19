# QA report

The runtime environment used to generate this package is offline, so the npm dependency graph could not be installed and the production Vite bundle could not be executed here. To compensate, two validation layers were run before packaging:

## 1. TypeScript source sanity

The TypeScript/TSX source was compiled through the available TypeScript compiler with temporary ambient module shims. This catches syntax and structural errors while leaving the real package APIs to be resolved by npm on installation.

Result: **PASS**

## 2. Responsive layout harness

A static DOM harness using the production CSS was rendered in headless Chromium at three target sizes. It validates the layout independently from WebGL.

Target sizes:

- 1366 × 768 laptop
- 390 × 844 phone
- 375 × 667 short phone

For every chapter (Index, Work, Lab, Space, People), the harness checked:

- no body/document scrolling
- the copy block remains inside its panel
- the dossier remains inside the viewport
- the persistent mobile dock has reserved space

Results:

| Chapter | 1366×768 | 390×844 | 375×667 |
|---|---|---|---|
| Index | PASS | PASS | PASS |
| Work | PASS | PASS | PASS |
| Lab | PASS | PASS | PASS |
| Space | PASS | PASS | PASS |
| People | PASS | PASS | PASS |

Representative screenshots are included at the repository root and the full static harness lives in `design/`.

## What still needs one real npm run

After downloading or pushing the repository:

```bash
npm install
npm run build
```

Commit the generated `package-lock.json` after the first successful install. The GitHub Pages workflow uses `npm install` and explicitly disables setup-node package-manager caching, so deployment does not depend on a pre-existing lockfile.
