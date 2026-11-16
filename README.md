# Telecommunications Big Data Analytics Research

**2012–2014 · Telecommunications analytics research** · Public research workspace in **Infinite Dimensions AI**.

Reconstruct Telecommunications industry-aligned analytics across business and operations support: churn, customer lifetime value, influence graphs, proactive service assurance, retention offers, fraud and next-best-action decision systems.

## Research motivation

How do operational and social relationships improve prediction and intervention decisions in historical telecom data?

This repository implements an initial **synthetic baseline and Three.js research visualization**. It does **not** assert that an employer originally used the particular coefficients, software, datasets or mathematical techniques in the new source code. The goal is to reconstruct period-appropriate techniques and test modern alternatives reproducibly.

**Historical/baseline techniques:** Logistic regression, random forests, survival modelling, centrality metrics, association rules, Hadoop, MapReduce and early Spark.

**Modern comparison programme:** Temporal graph neural networks, transformers, causal uplift analysis and accountable decision policies.

## Research outputs and workflow

- [Orchestra research milestones — todo.md](./todo.md)
- [Experiments and assumptions](./docs/experiments.md)
- [Methodology, evidence and provenance](./docs/methodology.md)
- [Technical architecture](./docs/architecture.md)
- [Git feature/fix/release flow and package publication](./docs/workflow.md)
- [Private Infinite Dimensions research portal integration](./docs/portal.md)
- [Public GitHub Pages documentation](https://infinite-dimensions-ai.github.io/research-telecom-big-data-analytics/) — available after first manual deployment.
- [Interactive Three.js demo](https://infinite-dimensions-ai.github.io/research-telecom-big-data-analytics/demo/) — available after first manual deployment.
- [GitHub Wiki](https://github.com/Infinite-Dimensions-AI/research-telecom-big-data-analytics/wiki) — enabled; first page must be published separately.

## Monorepo

```text
apps/web/             React + Vite + Three.js demonstration
packages/types/       @infinite-dimensions-ai/research-telecom-big-data-analytics-types (Zod schemas and TypeScript contracts)
packages/core/        @infinite-dimensions-ai/research-telecom-big-data-analytics-core (deterministic baselines)
docs/                 VitePress documentation and GitHub Pages output
wiki/                 staged wiki seed pages (not automatically published)
scripts/              local Git flow, semantic version and deployment helpers
.changeset/           Changesets for manual private GitHub Packages releases
todo.md               Orchestra/idai-mcp-v2 milestone plan
```

## Quick start

Requires Node.js 24 and Yarn 4 via Corepack:

```bash
cd /Users/mitchy/Public/Code/@github/infinite-dimensions-ai/@research/research-telecom-big-data-analytics
nvm use 24
corepack enable
corepack yarn install
corepack yarn main:check
corepack yarn dev:web    # local interactive app
corepack yarn dev:docs   # local documentation
```

The application is a **scaffold**, not a finished scientific simulator. The baseline uses labelled synthetic parameters. Avoid reusing it as claimed historical research evidence.

## Branching, local checks and releases

- `corepack yarn branch:feature some-name` → local `feature/some-name` branch.
- `corepack yarn branch:fix some-name` → local `fix/some-name` branch.
- `corepack yarn branch:release 0.2.0` → local `release/0.2.0` branch.
- `corepack yarn main:check` → lint, type checking, tests, production builds and documentation build.
- `corepack yarn hooks:install` → **optional** local post-merge quality gate on main (no GitHub Actions).
- `corepack yarn changeset` → describe package changes before merge.
- `corepack yarn release:prepare` → validate and apply Changesets versions locally (no commit).
- `corepack yarn release:publish` → **manual** restricted package publication to GitHub Packages.
- `corepack yarn release:tag 0.2.0` → local semantic-version Git tag only.
- `corepack yarn docs:deploy` → **manual** publishing of prebuilt VitePress + demo to the `gh-pages` branch.

See [full branching/release instructions](./docs/workflow.md). Nothing runs on GitHub Actions, no release occurs on merge, and no source Git commit, push or merge is performed by this setup. Any automatic **server-side** checks would require a runner, which is deliberately not configured.

## Public source, restricted packages

This repository is **public**, and its source code is public. It has no open-source licence assigned yet; public visibility does not by itself grant a licence. Reusable packages are separately configured for **restricted** GitHub Packages publication at `https://npm.pkg.github.com`, using `GITHUB_PERSONAL_ACCESS_TOKEN` only in your local environment. Cross-repository projects consume *published versioned packages*, not relative local paths. No packages have been published yet.

## Publishing and research portal

VitePress is used instead of Docusaurus for light, Markdown-first documentation. The Three.js browser experience is a separate React/Vite build, packaged under the same static Pages site. GitHub Pages content is **public**, not a private research portal. For authenticated private research, link to or deploy the compiled application behind your own private research-site authentication. See [portal architecture](./docs/portal.md).

The wiki is enabled via the GitHub command-line client, but its initial Home page and Sidebar remain local seeds until you initialise and publish the separate wiki Git repository. Related research projects remain separate unless explicitly linked later.

## Programme integrity

This project is one part of a portfolio connecting historical computational problems to current artificial-intelligence research. Historical model reconstructions are explicitly labelled; only independently verifiable original work belongs in the formal academic curriculum vitae.
