import React from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar />
      <Text style={{ color: 'blue' }}>Coffee Time</Text>
    </SafeAreaView>
  );
}

export default App;
