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
- compact desktop and mobile layout rules
- presence of the main work, current role, résumé, and contact content
- absence of em dashes and en dashes in visible source
- centralized responsive rules and bounded component/style module sizes

The interface includes a reduced-motion mode, off-screen animation pausing, and capped rendering density for mobile devices.

The layout uses a single 82.5 rem content rail and normal browser zoom. It changes
composition at small-desktop, tablet, mobile, and narrow-phone breakpoints rather
than resizing the entire page.

## Latest verification

The production build passes the source quality check, strict TypeScript
compilation, and Vite bundling. Before public launch, manually exercise the three case tabs, interactive controls,
résumé link, email link, and external project links on one phone and one desktop
browser.
