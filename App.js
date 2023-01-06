import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {fonts} from './src/styles/fonts';
import {colors} from './src/styles/colors';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.titleText}>Hello, world!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontFamily: fonts.regularItalic,
    color: colors.blue,
  },
});

export default App;
