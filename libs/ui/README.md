# @hannature/ui

Shared component library consumed by the Hannature web (Next.js) and mobile (Expo / React Native) apps. Every component ships a web (`.tsx`) and a React Native (`.native.tsx`) implementation that share a typed contract — Metro and webpack/Vite each pick the right file via their platform extensions.

## Components

**Atoms** — `Avatar`, `Badge`, `Button`, `Card`, `Input`, `Modal`, `ProgressBar`.

**Molecules** — `MealCard`, `WorkoutCard`, `DayTile`, `StarCounter`, `RewardBanner`. These compose atoms; they don't re-implement primitives.

## Working on a component

```sh
# Run the unit + a11y tests (vitest + vitest-axe)
npx nx run @hannature/ui:test

# Storybook with the a11y addon
npx nx run @hannature/ui:storybook

# Static Storybook build (matches CI)
npx nx run @hannature/ui:build-storybook
```

The companion design-token contrast tests live in `@hannature/design-tokens`:

```sh
npx nx run @hannature/design-tokens:test
```

## Releases (Changesets)

Versioning for `@hannature/ui` and `@hannature/design-tokens` is driven by [Changesets](https://github.com/changesets/changesets). When a PR changes either lib, run:

```sh
npx changeset
```

…pick the affected packages, choose a bump (patch / minor / major), and commit the generated file alongside your code change. On merge to `main` the [release workflow](../../.github/workflows/release.yml) opens a "version packages" PR; merging that PR publishes to npm (requires `NPM_TOKEN`).
