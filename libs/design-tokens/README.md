# @hannature/design-tokens

Shared design tokens for the Hannature platform. The same package is consumed by Next.js (web, backoffice) via Tailwind CSS, and by the React Native mobile app via NativeWind, so the brand language stays identical across surfaces.

## What's in the box

| Domain | Export | Notes |
| --- | --- | --- |
| Color palette | `palette` | Brand hex values |
| Semantic colors | `semanticColors` | Role-based aliases (`titleText`, `background`, …) |
| Typography | `textStyles`, `fontFamilies`, `fontSizes`, `fontWeights` | H1–H6, body, bodySm, caption |
| Spacing | `spacing` | 4pt grid (`0…24` step keys → `px` values) |
| Radius | `radius` | `none, sm, md, lg, xl, pill, full` |
| Shadows | `shadows`, `nativeShadows` | Web `box-shadow` + RN `shadow*` shape |
| Bundle | `tokens` | Frozen object grouping all of the above |

### Color palette

| Token | Hex | Role |
| --- | --- | --- |
| `palette.brown` | `#793b17` | Titles (H1–H2) |
| `palette.cream` | `#f9faf1` | Backgrounds |
| `palette.blush` | `#e8bfb0` | CTAs / decorative |
| `palette.black` | `#000000` | Body text |
| `palette.white` | `#ffffff` | Surface |

### Type scale

| Style | Family | Size | Line height | Weight |
| --- | --- | --- | --- | --- |
| `h1` | serif | 48px | 56px | 600 |
| `h2` | serif | 40px | 48px | 600 |
| `h3` | serif | 32px | 40px | 500 |
| `h4` | sans | 24px | 32px | 600 |
| `h5` | sans | 20px | 28px | 600 |
| `h6` | sans | 18px | 24px | 600 |
| `body` | sans | 16px | 24px | 400 |
| `bodySm` | sans | 14px | 20px | 400 |
| `caption` | sans | 12px | 16px | 500 |

### Spacing (4pt grid)

`spacing[n]` → `n × 4 px`. Keys: `0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24`.

### Radius

`none = 0`, `sm = 4`, `md = 8`, `lg = 16`, `xl = 24`, `pill = full = 9999`.

## Usage

### Plain TypeScript

```ts
import { tokens } from '@hannature/design-tokens';

const titleColor = tokens.colors.semantic.titleText;
const cardSpacing = tokens.spacing[4];
```

### Next.js (Tailwind CSS)

The package ships a Tailwind preset at `@hannature/design-tokens/tailwind`.

```ts
// apps/web/tailwind.config.ts
import type { Config } from 'tailwindcss';
import preset from '@hannature/design-tokens/tailwind';

export default {
  presets: [preset as Config],
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'],
} satisfies Config;
```

```css
/* apps/web/src/app/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

You can then use brand-aware utilities directly:

```tsx
<button className="bg-cta text-ctaForeground rounded-md px-4 py-2">
  Book a session
</button>
```

### React Native (NativeWind)

```ts
// apps/mobile/tailwind.config.ts — same preset as the web apps
import preset from '@hannature/design-tokens/tailwind';
export default { presets: [preset], content: ['./src/**/*.{ts,tsx}'] };
```

```js
// apps/mobile/.babelrc.js
module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
  };
};
```

```js
// apps/mobile/metro.config.js
const { withNativeWind } = require('nativewind/metro');
module.exports = withNativeWind(metroConfig, {
  input: './global.css',
  configPath: './tailwind.config.ts',
});
```

```tsx
import { View, Text } from 'react-native';
import { useTheme } from './ThemeProvider';

export const Card = () => {
  const theme = useTheme();
  return (
    <View
      className="bg-surface rounded-lg p-4"
      style={theme.nativeShadows.md}
    >
      <Text className="text-titleText">Hello</Text>
    </View>
  );
};
```

`useTheme()` exposes the same frozen `tokens` object for cases where dynamic JS access is more convenient than `className` (e.g. shadow elevation on iOS).

## Versioning

Versioned with semver (`0.1.0` → first real release). Publishing happens through the Nx workspace; downstream apps depend on this package via the `@hannature/design-tokens` workspace alias and pick up the new version on the next install.
