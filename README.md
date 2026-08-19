# Ernest Wong — Field Notes

A dependency-free personal portfolio built as a physical engineering dossier rather than a generic portfolio template.

## Local preview

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deployment

The included GitHub Pages workflow publishes the repository as a static site. There is no Node build step and no lockfile requirement.

## Structure

- `index.html` — content and semantics
- `styles.css` — visual system, responsive layout and motion
- `app.js` — tab navigation, release simulator, CleanListen demo and small Easter eggs
- `resume.pdf` — linked résumé
- `.github/workflows/deploy.yml` — static GitHub Pages deployment

## Sources / external project links

The space section links directly to the official SFU Satellite and ALEASAT sites. Personal impact claims should remain aligned with Ernest's résumé and project history.
