interface IFontFamily {
  'SF-UI-Text': 'SF-UI-Text';
  Lobster: 'Lobster';
}

export interface ITheme {
  colors: {
    primary: string;
    onPrimary: string;
    background: string;
    onBackground: string;
    onBackgroundVariant: string;
    onBackgroundVariant2: string;
    outline: string;
    outlineVariant: string;
    error: string;
  };
  font: {
    families: IFontFamily;
    sizes: {
      headline1: number;
      headline2: number;
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
    onBackgroundVariant2: '#474747',
    outline: '#ffffff',
    outlineVariant: '#EAEAEA',
    error: 'red',
  },
  font: {
    families: {
      'SF-UI-Text': 'SF-UI-Text',
      Lobster: 'Lobster',
    },
    sizes: {
      headline1: 64,
      headline2: 20,
      body1: 16,
      body2: 14,
    },
  },
};

export const themes: IThemes = {
  light: lightTheme,
};
