/* @flow */
'use strict';

import React from 'react';
import AppContainer from './AppContainer';
import DevToolsContainer from './DevToolsContainer';
import configureStore from '../store/configureStore';
import { View, StyleSheet } from 'react-native';
var { Provider } = require('react-redux');

class Root extends React.Component {
  state: {
    isLoading: boolean;
    store: any;
  };

  constructor() {
    super();
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({isLoading: false})),
    };
  }

  render() {
    if(this.state.isLoading){
      return null;
    }

    return (
      <Provider store={this.state.store}>
        <View style={styles.container}>
          <AppContainer />
          {/* <DevToolsContainer style={{
            padding: 15,
            backgroundColor: 'gray'
          }}/> */}
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Root;
