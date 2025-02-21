import '@emotion/react';
import { lightTheme } from '../theme';

type ThemeType = typeof lightTheme;

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends ThemeType {}
}
