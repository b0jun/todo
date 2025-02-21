import { css } from '@emotion/react';
import { Theme } from '@emotion/react';

export const GlobalStyles = (theme: Theme) => css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${theme.background};
    color: ${theme.text};
    font-family: Arial, sans-serif;
    transition: all 0.3s ease-in-out;
  }
`;
