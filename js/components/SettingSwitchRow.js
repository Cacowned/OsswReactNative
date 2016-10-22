/* @flow */
'use strict';

import React, { PropTypes } from 'react';
import { Switch, Text, View, StyleSheet } from 'react-native';

class SettingSwitchRow extends React.Component{
  render(){
    const {label, value} = this.props;
    return (
      <View style={styles.row}>
        <Text>{label}</Text>
        <Switch
          value={value}
          onValueChange={this._onValueChange.bind(this)}/>
      </View>
    );
  }

  _onValueChange(){
    this.props.onValueChange();
  }
}

SettingSwitchRow.propTypes = {
  label: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  row: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SettingSwitchRow;
