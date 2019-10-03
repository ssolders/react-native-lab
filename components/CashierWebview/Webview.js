import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
// import {HostedFields,Field,FieldType} from 'hosted-fields-sdk'
import html from './index.html';

export default class CashierWebView extends Component {
  constructor() {
    super();
    this.webview = null
  }

  componentDidUpdate() {
    if (this.props.shouldReload) {
      if (this.webview) {
        this.webview.reload();
      }
    }
  }

  render() {
    let jsCode = `!function(){var e=function(e,n,t){if(n=n.replace(/^on/g,""),"addEventListener"in window)e.addEventListener(n,t,!1);else if("attachEvent"in window)e.attachEvent("on"+n,t);else{var o=e["on"+n];e["on"+n]=o?function(e){o(e),t(e)}:t}return e},n=document.querySelectorAll("a[href]");if(n)for(var t in n)n.hasOwnProperty(t)&&e(n[t],"onclick",function(e){new RegExp("^https?://"+location.host,"gi").test(this.href)||(e.preventDefault(),window.postMessage(JSON.stringify({external_url_open:this.href})))})}();`

    // if (this.webview) {
    //   this.webview.setJavaScriptCanOpenWindowsAutomatically(true);
    //   this.webview.setSupportMultipleWindows(true);
    // }

    return (
      <WebView
        ref={ref => (this.webview = ref)}
        originWhitelist={['*']}
        source={html}
        style={styles.webView}
        automaticallyAdjustContentInsets={false}
        overScrollMode="never"
        javaScriptEnabled={true}
        javaScriptCanOpenWindowsAutomatically={true}
        supportMultipleWindows={true}
        domStorageEnabled={true}
        useWebkit={false}
        allowingReadAccessToURL={true}
        onMessage={this.onMessage.bind(this)}
        injectedJavaScript={jsCode}
      />
    );
  }

  onMessage(e) {
    alert('message')
    // retrieve event data
    var data = e.nativeEvent.data;
    // maybe parse stringified JSON
    try {
      data = JSON.parse(data)
    } catch ( e ) {  }
    
    // check if this message concerns us
    if ( 'object' == typeof data && data.external_url_open ) {
      // proceed with URL open request
    }
  }
}

const styles = StyleSheet.create({
  webviewContainer: {
    flex: 1,
  },
});
