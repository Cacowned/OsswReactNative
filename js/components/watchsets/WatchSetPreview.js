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
const base64 = require('base64-js');
import {
  NumberControlRenderer,
  ImageControlRenderer,
  ProgressControlRenderer,
} from './preview';


function drawWatchSet(control, watchset, screenNr:number){
  if(watchset){
    const { screens, resources } = watchset.data;
    if(screenNr < 0 || screenNr >= screens.length){
      return;
    }
    screens[screenNr].controls.forEach((item)=>{
      switch(item.type){
        case "number":
          var ncr = new NumberControlRenderer(item, resources);
          ncr.render(control, 9);
        break;
        case "image":
          new ImageControlRenderer(item, resources).render(control);
        break;
        case "progress":
          new ProgressControlRenderer(item).render(control, 50);
        break;
      }
    });
  }
  else {
    control.drawRectangle(0,0,144,168, 'white')
    control.drawLine(0,0, 144, 168, 'white');
    control.drawLine(0,168, 144, 0, 'white');
  }
  control.invalidate();
}

class WatchSetPreview extends React.Component {
  control: Object;

  constructor(props:Object){
    super(props);

    this.state = ({
      currentScreen: 0,
    }:any);
  }

  componentDidMount(){
    var watchset = this.props.watchSet;

    drawWatchSet(this.control, watchset, this.state.currentScreen);
  }

  componentWillUpdate(nextProps: Object, nextState:Object){
    var watchset = nextProps.watchSet;
    drawWatchSet(this.control, watchset, nextState.currentScreen)
  }

  _updateScreen(delta){
    var next = this.state.currentScreen + delta;
    var nrOfScreens = this.props.watchSet.data.screens.length;
    if(next < 0){
      next = nrOfScreens - 1;
    } else if(next >= nrOfScreens){
      next = 0;
    }

    this.setState({currentScreen: next});
  }

  render(){
    var size = this.props.size;
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
          ref={(ref)=>this.control = ref}
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
  size: PropTypes.number,
  watchSet: PropTypes.object,
}

export default WatchSetPreview;
