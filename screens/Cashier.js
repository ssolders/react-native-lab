import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import CashierWebView from '../components/CashierWebview/Webview';
import {withNavigationFocus} from 'react-navigation';
// import html from '../components/CashierWebView/index.html';
// import html2 from '../components/CashierWebView/index2.html';

// export default function CashierScreen() {
class CashierScreen extends Component {
  constructor() {
    super();

    this.shouldReload = false;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      // Use the `this.props.isFocused` boolean
      // Call any action
      console.log('In update set true');
      this.shouldReload = !this.props.isFocused;
    }
  }

  render() {
    // source={{uri: 'https://hakkespro.github.io/testRepo/cashiern.html'}}
    // source={html}
    // source={html2}

    return (
      <View style={styles.container}>
        <CashierWebView
          style={{marginTop: 20, flex: 1}}
          shouldReload={this.shouldReload}
          source={{
            // uri: 'https://ssolders.github.io/demo-public-pages/',
            uri: 'https://ssolders.github.io/demo-public-pages/test1.html',
          }}
        />
      </View>
    );
  }
}

CashierScreen.navigationOptions = {
  title: 'Cashier',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default withNavigationFocus(CashierScreen);
