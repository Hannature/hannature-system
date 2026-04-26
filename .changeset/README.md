# Changesets

This directory holds the [changeset](https://github.com/changesets/changesets) files used to publish the internal libs (`@hannature/ui`, `@hannature/design-tokens`, …).

## Adding a changeset

When your PR changes a published lib, run:

```sh
npx changeset
```

Pick the affected packages, choose a bump (patch / minor / major), and write a one-line summary. The CLI writes a markdown file here. Commit it with the rest of your change.

## Releasing

When `main` advances with pending changesets, the `release` workflow runs `changeset version` (which updates package versions and changelogs) and `changeset publish` (which publishes to npm). The workflow needs an `NPM_TOKEN` repo secret with publish rights.

## Apps are not published

Consumer apps (`apps/web`, `apps/mobile`, `apps/api`, `apps/backoffice`) are listed under `ignore` in `config.json` — they are deployed, not published, and Changesets should not propose version bumps for them.
