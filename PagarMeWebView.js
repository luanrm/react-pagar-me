import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {Dimensions} from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
export default class PagarMeWebView extends Component {
  render() {
    return (
      <WebView
        originWhitelist={['*']}
        source={{ uri: "android\app\src\main\res\pagarme.html" }}
        style={{
          width: deviceWidth,
          height: deviceHeight,
        }}
      />
    );
  }
}
