# Design notes

## What changed

The site combines a readable portfolio with one memorable engineering interaction. The orbital model establishes systems and mission-software credibility, while the case files keep every important claim available without requiring interaction.

## Visual language

- graphite instrumentation surfaces
- blueprint cyan for system paths and active states
- pale technical paper for readable engineering evidence
- safety orange and signal green used sparingly
- IBM Plex Mono and Space Grotesk typography
- animated telemetry, orbital geometry, and pointer-responsive depth

## Content rules

- lead with what changed for people, not with a technology list
- keep dates and roles precise
- avoid claims that cannot be defended publicly
- avoid generic case-study labels and inflated metrics
- keep the current role current and past roles clearly closed

## Responsive behaviour

- desktop pairs the engineering profile with the live systems model
- tablet stacks the profile, model, and case files
- mobile uses a single column and vertical system paths
- all important links remain at least 44 pixels tall
- motion is disabled when reduced motion is requested
- layouts are designed at normal 100 percent browser zoom

## Implementation rules

- keep portfolio copy and project data in `src/content.ts`
- keep components small and named for the interface responsibility they own
- keep design values in semantic tokens rather than page-specific aliases
- keep every media query in `src/styles/responsive.css`
- prefer intrinsic layout, `clamp()`, and content rails over viewport scaling
- add a new rule to its owning module instead of appending an override layer
- preserve semantic headings, keyboard tab behavior, visible focus, and reduced motion

The source quality check enforces these boundaries, including component and style
module size limits. The intent is to make the next change obvious to a developer
who did not build the original page.
