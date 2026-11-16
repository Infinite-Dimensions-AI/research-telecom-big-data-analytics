# Monorepo architecture

- `packages/types`: portable validated experiment, scenario and metric contracts; publishable as `@infinite-dimensions-ai/research-telecom-big-data-analytics-types`.
- `packages/core`: deterministic baseline model, with unit tests; publishable as `@infinite-dimensions-ai/research-telecom-big-data-analytics-core`.
- `apps/web`: React, TypeScript, Vite, and Three.js graphical research demonstration.
- `docs/`: VitePress source, built separately and deployed to GitHub Pages when run manually.
- `wiki/`: local seed Markdown for the GitHub repository Wiki, which is a separate Git repository.
- `todo.md`: Orchestra-compatible milestones and handoff protocol.

Workspace references use Yarn `workspace:^`; **cross-repository** consumers install the published package versions from GitHub Packages, not local relative paths.

## Experimental architecture

```text
Validated scenario → Deterministic baseline → Experimental metrics
       ↑                                       ↓
  shared types                           React/Three.js demo
       │                                       │
    docs / wiki ← reproducible interpretation ─┘
```
