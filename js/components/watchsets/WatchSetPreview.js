/* @flow */
'use strict';

import React, { PropTypes } from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  Dimensions
} from 'react-native';
import WatchControl from './preview/WatchControl';

class WatchSetPreview extends React.Component {
  state: {
    currentScreen: number;
    numScreens: number;
  }
  constructor(props:Object){
    super(props);

    this.state = ({
      currentScreen: 0,
      numScreens: props.watchSet.data.screens.length,
    }:any);
  }

  _updateScreen(delta){
    var next = this.state.currentScreen + delta;
    var nrOfScreens = this.state.numScreens;
    if(next < 0){
      next = nrOfScreens - 1;
    } else if(next >= nrOfScreens){
      next = 0;
    }

    this.setState({currentScreen: next});
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.leftSideButtons}>
          <TouchableHighlight>
            <Text>Back</Text>
          </TouchableHighlight>
        </View>
        <WatchControl
          style={styles.watchcontrol}
          clearColor='black'
          foregroundColor='white'
          backgroundColor='black'
          showScreen={this.state.currentScreen}
          watchSet={this.props.watchSet}
          />

        <View style={styles.rightSideButtons}>
          <TouchableHighlight onPress={this._updateScreen.bind(this, -1)}>
            <Text>Up</Text>
          </TouchableHighlight>
          <TouchableHighlight>
            <Text>Menu</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._updateScreen.bind(this, 1)}>
            <Text>Down</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  leftSideButtons:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  rightSideButtons:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  watchcontrol: {
    width: 144,
    height:168,
  },
});

WatchSetPreview.propTypes = {
  watchSet: PropTypes.object,
}

export default WatchSetPreview;
