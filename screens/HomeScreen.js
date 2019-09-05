import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header} from 'react-native/Libraries/NewAppScreen';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <Text>Hello home world</Text>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
