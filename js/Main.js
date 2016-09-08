import React, {
  Component
}
from 'react';
import {
  StyleSheet,
  Text,
  View
}
from 'react-native';
import Header from './Header'
import Menu from './Menu'

const Dimensions = require('Dimensions');
const SplitViewWindows = require('SplitViewWindows');
const DRAWER_WIDTH_LEFT = 56;

class Main extends React.Component {
  _renderPaneContent: Function;

  constructor(props: Props) {
    super(props);
    // this._handleAction = this._handleAction.bind(this);
    this._renderPaneContent = this._renderPaneContent.bind(this);
  }

  render(): ? ReactElement<any> {
      return (
        <SplitViewWindows
          panePosition={SplitViewWindows.positions.Left}
          paneWidth = {Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
          ref = {(splitView) => {this.splitView = splitView;}}
          renderPaneView = {this._renderPaneContent} >
          <View style={styles.container}>
            <Header
              onPress={() => this.splitView.openPane()}
              title = 'Title'
              style = {styles.header}
            />
            <Text style = {styles.instructions}>
              To get started, edit index.windows.js
            </Text>
            <Text style = {styles.instructions} >
              Press Ctrl + R to reload,{'\n'}
              Shift + F10 or shake
              for dev menu
            </Text>
          </View >
        </SplitViewWindows>
      )
    }

  _renderPaneContent() {
    return ( <Menu style = {styles.paneContentWrapper}/>);
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = Main;
