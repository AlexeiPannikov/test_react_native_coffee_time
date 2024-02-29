import React, { useEffect } from 'react';
import { Platform, SafeAreaView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import RootNavigator from '@app/navigators/RootNavigator.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from '@app/store/store.ts';

function App(): React.JSX.Element {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

export default App;
