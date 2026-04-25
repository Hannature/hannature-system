import React, { createContext, useContext, type ReactNode } from 'react';
import { tokens, type Tokens } from '@hannature/design-tokens';

const ThemeContext = createContext<Tokens>(tokens);

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <ThemeContext.Provider value={tokens}>{children}</ThemeContext.Provider>
);

export const useTheme = (): Tokens => useContext(ThemeContext);
