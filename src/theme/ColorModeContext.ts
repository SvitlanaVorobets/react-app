import { createContext } from 'react';

import { Theme } from './theme';

export const ColorModeContext = createContext({
  mode: Theme.LIGHT as Theme,
  toggle: () => {},
  setMode: (() => {}) as (mode: Theme) => void,
});
