import React, { useEffect } from 'react';
import { Platform, SafeAreaView, StatusBar, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

function App(): React.JSX.Element {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <SafeAreaView>
      <StatusBar />
      <Text style={{ color: 'blue' }}>Coffee Time</Text>
    </SafeAreaView>
  );
}

export default App;
