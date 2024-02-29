export interface ITheme {
  colors: {
    primary: string;
    onPrimary: string;
    background: string;
    onBackground: string;
    onBackgroundVariant: string;
    outline: string;
    outlineVariant: string;
  };
  font: {
    families: {
      [p: string]: string;
    };
    sizes: {
      headerLarge: number;
      headerSmall: number;
      bodyLarge: number;
      bodySmall: number;
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
  },
  font: {
    families: {
      'SF-UI-Text-Regular': 'SF-UI-Text-Regular',
      'Lobster-Regular': 'Lobster-Regular',
    },
    sizes: {
      headerLarge: 20,
      headerSmall: 14,
      bodyLarge: 14,
      bodySmall: 14,
    },
  },
};

export const themes: IThemes = {
  light: lightTheme,
};
