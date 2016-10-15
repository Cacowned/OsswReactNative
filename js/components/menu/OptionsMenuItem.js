/* @flow */
'use strict';

import React, { PropTypes } from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text
} from 'react-native';

class OptionsMenuItem extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor='transparent'
          onPress={this.props.menuItem.action}
          style={styles.button}>
            <Text style={styles.text}>{this.props.menuItem.title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

OptionsMenuItem.propTypes = {
  menuItem: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  button:{
    padding: 8,
  },
  container:{
    justifyContent: 'center',
  },
  text:{
    color: 'white',
  },
});

export default OptionsMenuItem;
