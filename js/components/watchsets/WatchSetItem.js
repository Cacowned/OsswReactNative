/* @flow */

'use strict';

import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

const WatchSetItem = (props) => {
  return (
    <TouchableHighlight
      onPress={()=>props.onWatchSetSelected()}
      underlayColor='transparent'>
        <Text>watchset</Text>
    </TouchableHighlight>
  );
};

export default WatchSetItem;
