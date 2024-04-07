import React from 'react';

import {
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  useTheme,
  TextInput
} from 'react-native-paper';

import commonStyles from './styles/commonStyles';

function App(): JSX.Element {

  const paperTheme = useTheme();

  return (
    <SafeAreaView style={{ backgroundColor: paperTheme.colors.background, height: '100%' }}>
      <Text style={{ fontSize: 50, color: paperTheme.colors.onBackground }}>Hello world!</Text>
      <TouchableOpacity style={[commonStyles.button, { backgroundColor: paperTheme.colors.primary }]}>
        <Text style={[commonStyles.button.text, { color: paperTheme.colors.onTertiary }]}>Click me!</Text>
      </TouchableOpacity>
      <TextInput label={'Input'} style={{ backgroundColor: paperTheme.colors.secondary, margin: 8 }} />
    </SafeAreaView>
  );
}

export default App;
