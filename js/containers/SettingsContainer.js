/* @flow */
'use strict';

import React, { PropTypes } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import SettingSwitchRow from '../components/SettingSwitchRow';
import {
    toggleAutoSync,
} from '../actions';

class SettingsContainer extends React.Component{
  render(){
    return (
      <View>
        <SettingSwitchRow
          label='Synchronize time'
          onValueChange={()=>{
            this.props.onToggleAutoSync();
          }}
          value={this.props.autoSynchronizeTime}
        />
      </View>
    );
  }
}


const mapStateToProps = (state) => (
  {
    autoSynchronizeTime: state.settings.autoSynchronizeTime,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onToggleAutoSync: () => {
      dispatch(toggleAutoSync());
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
