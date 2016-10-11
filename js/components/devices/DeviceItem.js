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

const DeviceItem = (props : Object) => {
  var textStyle;
  if(props.device.state === "Disconnected"){
    textStyle = styles.disconnected;
  }
  // debugger;
  return (
    <TouchableHighlight
      onPress={()=>props.onDeviceSelected()}
      underlayColor='transparent'>
      <View>
        <View style={styles.row}>
          <View style={styles.itemContainer}>
            <Text style={textStyle}>{props.device.name}</Text>
            <Text style={textStyle}>{props.device.state}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.itemContainer}>
            <Text style={[styles.subtext,textStyle]}>{props.device.address}</Text>
            <Text style={[styles.subtext,textStyle]}>{props.device.rssi}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};
export default DeviceItem;
