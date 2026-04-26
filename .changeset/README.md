# Changesets

This directory holds the [changeset](https://github.com/changesets/changesets) files used to version the internal libs (`@hannature/ui`, `@hannature/design-tokens`, …).

## Adding a changeset

When your PR changes a versioned lib, run:

```sh
npx changeset
```

Pick the affected packages, choose a bump (patch / minor / major), and write a one-line summary. The CLI writes a markdown file here. Commit it with the rest of your change.

## Releasing

The libs are private and consumed by the apps in this monorepo via npm workspaces — they are not published to any registry. When `main` advances with pending changesets, the `release` workflow opens a "version packages" PR that runs `changeset version` to bump `package.json` versions and update each lib's `CHANGELOG.md`. Merging that PR is the release.

## Apps are not versioned

Consumer apps (`apps/web`, `apps/mobile`, `apps/api`, `apps/backoffice`) are listed under `ignore` in `config.json` — they are deployed, not versioned, and Changesets should not propose version bumps for them.
