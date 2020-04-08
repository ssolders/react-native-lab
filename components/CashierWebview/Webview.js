import React, { Component } from 'react'
import { Alert, StyleSheet, Linking } from 'react-native'
import { WebView } from 'react-native-webview'
var SendIntentAndroid = require('react-native-send-intent')
// import {HostedFields,Field,FieldType} from 'hosted-fields-sdk'
// import html from './index.html'
// import html2 from './index2.html'

export default class CashierWebView extends React.Component {
  constructor() {
    super()
    this.webview = null
    this.redirectUrl = null
    this.onLoad = this.onLoad.bind(this)

    this.state = {
      loaded: false
    }
  }

  componentDidUpdate() {
    if (this.props.shouldReload) {
      if (this.webview) {
        this.webview.reload()
      }
    }
  }

  onLoad(e) {
    console.log(this.state)
    // onload is called multiple times...
    if ( this.state.loaded ) {
      return
    }
    this.setState({ loaded: true }, () => this.webview.injectJavaScript('window.onLoad()'))
  }

  render() {
    const patchPostMessageFunction = function() {
      setTimeout(() => {
        var originalPostMessage = window.postMessage
        var patchedPostMessage = function(message, targetOrigin, transfer) { 
          originalPostMessage(message, targetOrigin, transfer)
        }
        patchedPostMessage.toString = function() { 
          return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage')
        }
        window.postMessage = patchedPostMessage
      }, 200)
    }
    
    const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';
    return (
      <WebView
        ref={ref => (this.webview = ref)}
        originWhitelist={['https://*', 'http://*']}
        source={this.props.source}
        style={styles.webView}
        javaScriptEnabled={true}
        canOpenWindowsAutomatically={true}
        domStorageEnabled={true}
        allowingReadAccessToURL={true}
        onMessage={this.state.loaded ? this.onMessage : null}
        injectedJavaScript={patchPostMessageJsCode}
        onNavigationStateChange={this.handleWebViewNavigationStateChange}
        onLoadStart={this.onLoad}
        mixedContentMode="always"
        thirdPartyCookiesEnabled={true}
        dataDetectorTypes="all"
        allowUniversalAccessFromFileURLs={true}
        scalesPageToFit={true}
        allowFileAccess={true}
        useWebKit={true}
      />
    )
  }

  handleLoadStart(start) {
    console.log('LOAD START')
    console.log(start)
  }

  async handleWebViewNavigationStateChange(newState) {
    // console.log(newState)
    // if (newState.url && newState.url.includes('swish://')) {
    //   const supported = await Linking.canOpenURL(newState.url);
    //   console.log('IS SUPPORTED: ', supported )
    //   if (supported) {
    //     // Alert.alert(`Link can be opened: ${newState.url}`);
    //     // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    //     // by some browser in the mobile
    //     // this.redirectUrl = link
    //     try {
    //       await Linking.openURL(link);
    //       console.log('LINK OPENED')
    //       // Alert.alert(`Link opened`);
    //     } catch (err) {
    //       console.log('LINK FAILED')
    //       console.log(err)
    //       // Alert.alert(`FAILED TO OPEN LINK`);
    //     }
        
    //   } else {
    //     Alert.alert(`Don't know how to open this URL: ${link}`);
    //   }
    // } else if (newState.url && newState.url.includes('bankid://')) {
    //   SendIntentAndroid.openApp(newState.url)
    //     .then(wasOpened => {
    //       console.log(wasOpened)
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // }

    console.log(newState)
    console.log(newState.url)
  }

  async onMessage(event) {
    var data = event.nativeEvent.data
    try {
      data = JSON.parse(data)
    } catch (error) {
      console.error(error)
    }
    if (typeof data === 'object' && data.eventType && data.eventType === 'APPLICATION_REDIRECT') {
      const link = data.payload.url // comes as {app}://
      console.log(link)
      const supported = await Linking.canOpenURL(link);

      if (supported) {
        try {
          await Linking.openURL(link);
        } catch (err) {
          console.error(err)
        }
        
      } else {
        console.log(`Don't know how to open this URL: ${link}`)
      }
    }
  }
}

const styles = StyleSheet.create({
  webviewContainer: {
    flex: 1,
  },
})
