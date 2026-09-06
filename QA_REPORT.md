# QA report

Verification is performed before each handoff with:

```bash
npm run build
```

The check covers:

- TypeScript compilation
- production Vite bundling
- visible keyboard focus
- reduced motion support
- mobile layout rules
- presence of the main work, current role, résumé, and contact content
- absence of em dashes and en dashes in visible source

The interface includes a reduced-motion mode, off-screen animation pausing, and capped rendering density for mobile devices.

## Latest verification

The production build currently passes the source quality check, TypeScript compilation, and Vite bundling. Before public launch, manually exercise the three case tabs, interactive controls, résumé link, email link, and external project links on one phone and one desktop browser.
