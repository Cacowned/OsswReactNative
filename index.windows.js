/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import Main from './js/Main'

class osswReactNative extends Component {
  render() {
    return (<Main/>);
  }
}


AppRegistry.registerComponent('osswReactNative', () => osswReactNative);
