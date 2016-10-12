/* @flow */

'use strict';

import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

const WatchSetItem = (props : Object) => {
  return (
    <TouchableHighlight
      onPress={()=>props.onWatchSetSelected()}
      underlayColor='transparent'>
        <Text>{props.watchset.name}</Text>
    </TouchableHighlight>
  );
};

export default WatchSetItem;
