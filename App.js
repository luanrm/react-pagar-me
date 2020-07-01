import React from 'react';
import {View, Text} from 'react-native';
import PagarMeWebView from './PagarMeWebView';

const App = () => {
  return (
    <>
      <View style={{flex: 1}}>
        <Text>React Native with Pagar me</Text>
        <PagarMeWebView></PagarMeWebView>
      </View>
    </>
  );
};

export default App;
