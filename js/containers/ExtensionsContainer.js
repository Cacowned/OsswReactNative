/* @flow */
'use strict';

import React, { PropTypes } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

class ExtensionsContainer extends React.Component{
  render(){
    return (
      <Text>No watchsets found.</Text>
    );
  }
}

export default connect()(ExtensionsContainer);
