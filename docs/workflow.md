# Git flow, offline verification and publishing

No GitHub Actions or automatic hosted continuous integration/deployment is configured. Package scripts **cannot execute merely because GitHub merges a pull request**; either run them manually, use the optional local post-merge hook, or introduce a runner later.

## Starting out

```bash
nvm use 24
corepack enable
corepack yarn install
corepack yarn main:check
corepack yarn dev:web
corepack yarn dev:docs
```

## Branch model

- `main`: validated integration branch.
- `feature/<slug>`: new research experiment or application feature.
- `fix/<slug>`: maintenance or regression fixes.
- `release/<semver>`: optional release hardening, such as `release/0.2.0`.

```bash
corepack yarn branch:feature new-simulator
corepack yarn branch:fix scoring-bug
corepack yarn branch:release 0.2.0
corepack yarn main:check
```

These helpers create **local branches only**, require a clean worktree, and neither commit nor push nor merge.

## Quality gates

`corepack yarn main:check` invokes lint, TypeScript type checking, tests, production build, and documentation build. Run it **before merging and after updating main**.

Optionally, `corepack yarn hooks:install` installs a local Git hooks path. Its `post-merge` script invokes `main:check` only when the checked-out branch is main. It **cannot validate server-side merges** or replace GitHub Actions.

## Changesets and package releases

```bash
# On a feature/fix branch with publishable package changes:
corepack yarn changeset

# After you have merged to main and checked the code:
corepack yarn main:check
corepack yarn release:prepare
# Review and manually commit generated package/version/changelog changes.

# ONLY when ready to publish private scoped packages:
export GITHUB_PERSONAL_ACCESS_TOKEN=your_token
corepack yarn release:publish

# Optional monorepo-level semantic version tag (local only):
corepack yarn release:tag 0.2.0
# You explicitly decide when to push the branch and tags.
```

Changesets manage publishable package versions and may create their own package-level Git tags during publishing. The root `release:tag` helper uses `v<version>` for an optional repository release tag; do not duplicate an existing tag. The release commands never commit or push your main branch, and publishing is never automatic.

Cross-repository installation after manual package publication uses `@infinite-dimensions-ai/*` through `https://npm.pkg.github.com`, authenticated with `GITHUB_PERSONAL_ACCESS_TOKEN`. Packages are configured `restricted`, but **source files in this public repository remain public**. Publishing packages does not hide their public source code.

## Public documentation and Wiki

```bash
corepack yarn docs:build
# Explicitly publishes compiled static artifacts to gh-pages:
corepack yarn docs:deploy
```

The GitHub Pages source is the **gh-pages branch root**, configured in repository Settings → Pages after the initial branch exists. This deployment command intentionally pushes **only when you run it**; it does not push your main source branch. Some GitHub-hosted Pages publication events are still processed by GitHub's Pages infrastructure, even when no custom Actions workflow is present.

GitHub Wiki is enabled. GitHub wikis use a separate `.wiki.git` Git repository. Create the first Wiki page in GitHub's web interface, then clone that wiki repository and copy the staged `wiki/Home.md` and `wiki/_Sidebar.md` when you choose to publish it. The `wiki/` directory in this source repository is **not itself the published wiki**.
