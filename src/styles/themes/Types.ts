import 'styled-components'

export type ThemeTypes = {
  title: string,
  colors: {
    primary: {
      lighter: string,
      light: string,
      normal: string,
      dark: string,
      darker: string,
    },
    secondary: string,
    tertiary: string,

    background: {
      lighter: string,
      light: string,
      normal: string,
      dark: string,
      darker: string,
    }
    text: {
      light: string;
      normal: string;
      dark: string;
    }

    white: string;
    grey: string;
    opaque: string;
    purple: string;
    purpleDark: string;
    green: string;
    orange: string;
    pink: string;
    blue: string;
    lightBlur: string;
    red: string;
    yellow: string;
  }
};
