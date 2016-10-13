/* @flow */
'use strict';

import React from 'react';
import AppContainer from './AppContainer';
import configureStore from '../store/configureStore';

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
        <AppContainer />
      </Provider>
    );
  }
}

export default Root;
