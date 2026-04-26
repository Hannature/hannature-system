import nx from '@nx/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            { sourceTag: 'scope:api', onlyDependOnLibsWithTags: ['scope:shared', 'scope:api'] },
            { sourceTag: 'scope:mobile', onlyDependOnLibsWithTags: ['scope:shared', 'scope:mobile'] },
            { sourceTag: 'scope:web', onlyDependOnLibsWithTags: ['scope:shared', 'scope:web'] },
            { sourceTag: 'scope:backoffice', onlyDependOnLibsWithTags: ['scope:shared', 'scope:backoffice'] },
            { sourceTag: 'scope:shared', onlyDependOnLibsWithTags: ['scope:shared'] },
            { sourceTag: 'type:app', onlyDependOnLibsWithTags: ['type:feature', 'type:ui', 'type:data', 'type:util'] },
            { sourceTag: 'type:ui', onlyDependOnLibsWithTags: ['type:ui', 'type:util'] },
            { sourceTag: 'type:data', onlyDependOnLibsWithTags: ['type:data', 'type:util'] },
            { sourceTag: 'type:util', onlyDependOnLibsWithTags: ['type:util'] }
          ]
        },
      ],
    },
  },
  {
    files: ['**/*.tsx', '**/*.jsx'],
    plugins: { 'jsx-a11y': jsxA11y },
    rules: {
      ...jsxA11y.configs.recommended.rules,
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
