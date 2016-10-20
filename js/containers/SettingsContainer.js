/* @flow */
'use strict';

import React, { PropTypes } from 'react';
import { Switch } from 'react-native';
import { connect } from 'react-redux';

class SettingsContainer extends React.Component{
  render(){
    return (
      <Switch/>
    );
  }
}

export default connect()(SettingsContainer);
