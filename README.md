

----

Why this portfolio is worth a quick review

- **Impact-first highlights**: real-world production work (50+ applications supported, 8+ environments monitored, portal impact exceeding $100M, balloon mission to ~30 km).
- **Strong fit**: platform engineering, SRE, developer tools, mission software, and AI security.
- **Practical outcomes**: tooling, automation, and dashboards focused on measurable reliability and developer productivity.

----

- Run the site locally to inspect code and interactive demos:

```bash
npm install
npm run dev
# open http://localhost:5173
```

- Build for production:

```bash
npm run build
npm run preview
```

- Where content lives:
	- `src/data.ts` — edit profile, projects, experience, and links.
	- `src/App.tsx` — layout, interactive lab, and UI components.
	- `src/styles.css` — visual theme, animations, and accessibility rules.
	- `public/resume.pdf` — resume file (replace to update downloadable resume).

----

Easter eggs & demos

- Interactive Lab: includes a small keyboard-controlled mini-game and a terminal-style log to show UI polish.
- Secrets: type `orbit` in the site or try the classic Konami sequence (↑ ↑ ↓ ↓ ← → ← → B A) to unlock playful visuals.

----

Contact & links

- Email: ernest_wong@sfu.ca
- LinkedIn: https://linkedin.com/in/jumiknows/
- GitHub: https://github.com/jumiknows
- Resume (PDF): available on the site (public/resume.pdf)

----

Deploy notes

- The site is a Vite React app — it builds into `dist/` and can be published to GitHub Pages or any static hosting.

----

If you'd like, I can prepare a 1-page PDF summary tailored to your team with suggested first 30/60/90-day goals for the role.

## Beginner-friendly animation guide

If you want to tweak the typing animation, easter eggs, blue background effects, or cursor trail without deep coding knowledge, see:

```text
docs/NO-CODE-ANIMATION-GUIDE.md
```
