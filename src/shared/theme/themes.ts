export interface ITheme {
  colors: {
    primary: string;
    onPrimary: string;
    background: string;
    onBackground: string;
    onBackgroundVariant: string;
    outline: string;
    outlineVariant: string;
    error: string;
  };
  font: {
    families: {
      [p: string]: string;
    };
    sizes: {
      headline1: number;
      body1: number;
      body2: number;
    };
  };
}

export type ThemeName = 'light';

type IThemes = Record<ThemeName, ITheme>;

export const lightTheme: ITheme = {
  colors: {
    primary: '#B3C39C',
    onPrimary: '#ffffff',
    background: '#ffffff',
    onBackground: '#717171',
    onBackgroundVariant: '#BBBBBB',
    outline: '#ffffff',
    outlineVariant: '#EAEAEA',
    error: 'red',
  },
  font: {
    families: {
      'SF-UI-Text-Regular': 'SF-UI-Text-Regular',
      'Lobster-Regular': 'Lobster-Regular',
    },
    sizes: {
      headline1: 64,
      body1: 18,
      body2: 16,
    },
  },
};

export const themes: IThemes = {
  light: lightTheme,
};
