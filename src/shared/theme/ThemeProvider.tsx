import React, {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';
import { type ThemeName, themes } from '@shared/theme/themes.ts';
import { StatusBar } from 'react-native';

interface IThemeContext {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const themeSwitcher = (theme: ThemeName) => {
    setTheme(theme);
  };

  return {
    theme: themes[theme],
    themeSwitcher,
  };
};

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<ThemeName>('light');

  const changeTheme = useCallback(setTheme, [setTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: changeTheme,
      }}
    >
      <StatusBar />
      {children}
    </ThemeContext.Provider>
  );
};
