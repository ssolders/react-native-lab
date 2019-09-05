import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';

export default function HostedFieldsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text>Hosted fields</Text>
    </ScrollView>
  );
}

HostedFieldsScreen.navigationOptions = {
  title: 'Hosted fields',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
  },
});
