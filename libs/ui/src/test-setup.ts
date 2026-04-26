import { expect } from 'vitest';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import * as axeMatchers from 'vitest-axe/matchers.js';

expect.extend(jestDomMatchers as unknown as Record<string, never>);
expect.extend(axeMatchers as unknown as Record<string, never>);

interface AxeAssertions {
  toHaveNoViolations(): void;
}

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any>
    extends TestingLibraryMatchers<unknown, T>,
      AxeAssertions {
    _augBrand?: T;
  }
  interface AsymmetricMatchersContaining
    extends TestingLibraryMatchers<unknown, void>,
      AxeAssertions {}
}
