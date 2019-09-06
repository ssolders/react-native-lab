import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Header} from 'react-native/Libraries/NewAppScreen';

export default function HomeScreen() {
  const [value, onChangeText] = React.useState('Useless Placeholder');

  return (
    <View style={styles.container}>
      <Header />
      <Text>Hello home world</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
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
