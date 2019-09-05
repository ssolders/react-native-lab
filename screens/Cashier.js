import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
//import CashierWebView from '../components/CashierWebview/Webview';
/* {
  <CashierWebView />
}*/

export default function CashierScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </ScrollView>
  );
}

CashierScreen.navigationOptions = {
  title: 'Cashier',
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
