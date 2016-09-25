/* @flow */

'use strict';

import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  itemContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  subtext: {
    fontSize: 12,
    // color: 'gray',
  },
  disconnected: {
    color: '#777',
  }
});

const DeviceItem = (props) => {
  var textStyle;
  if(props.state === "Disconnected"){
    textStyle = styles.disconnected;
  }
  return (
    <TouchableHighlight
      // onPress={this.selectWatch.bind(this, data)}
      underlayColor='transparent'>
      <View>
        <View style={styles.row}>
          <View style={styles.itemContainer}>
            <Text style={textStyle}>{props.name}</Text>
            <Text style={textStyle}>{props.state}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.itemContainer}>
            <Text style={[styles.subtext,textStyle]}>{props.address}</Text>
            <Text style={[styles.subtext,textStyle]}>{props.rssi}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};
export default DeviceItem;
