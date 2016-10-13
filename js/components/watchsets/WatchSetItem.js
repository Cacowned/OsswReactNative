/* @flow */

'use strict';

import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

const WatchSetItem = (props : Object) => {
  var textStyle;
  if(props.watchset.isSelected){
    textStyle = styles.selected;
  }
  return (
    <TouchableHighlight
      onPress={()=>props.onWatchSetSelected()}
      underlayColor='transparent'>
      <View style={[styles.item,textStyle]}>
        <Text style={styles.text}>{props.watchset.name}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  item:{
    padding: 14,
  },
  selected: {
    backgroundColor: '#d5fbf5',
  },
  text:{
    fontSize: 18,
  }
})

export default WatchSetItem;
