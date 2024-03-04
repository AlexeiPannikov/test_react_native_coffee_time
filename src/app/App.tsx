import React, { useEffect } from 'react';
import { Platform, SafeAreaView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import RootNavigator from '@app/navigators/RootNavigator.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from '@app/store/store.ts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '@/shared';
import Toast from 'react-native-toast-message';
import YaMap from 'react-native-yamap';
import { API_KEY } from '@env';

YaMap.init(API_KEY);

function App(): React.JSX.Element {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </SafeAreaView>
          <Toast />
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
