/* @flow */

'use strict';
import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Header from './Header';
var Menu = require('./Menu');
var Footer = require('./Footer');

import DevicesContainer from './containers/DevicesContainer';
import WatchSetsContainer from './containers/WatchSetsContainer';
import UtilitiesContainer from './containers/UtilitiesContainer';
import ExtensionsContainer from './containers/ExtensionsContainer';
import ApplicationsContainer from './containers/ApplicationsContainer';
import SettingsContainer from './containers/SettingsContainer';
import OptionsMenuContext from './containers/OptionsMenuContext';

import type { OptionItem } from './options/types';
const SplitViewWindows = require('SplitViewWindows');
const DRAWER_WIDTH_LEFT = 280;

class Main extends React.Component {
  splitView:SplitViewWindows;

  constructor(props: Object) {
    super(props);
  }

  render(): ? ReactElement<any> {
      return (
        <SplitViewWindows
          panePosition={SplitViewWindows.positions.Left}
          paneWidth = {DRAWER_WIDTH_LEFT}
          ref = {(splitView) => {this.splitView = splitView;}}
          renderPaneView = {this._renderPaneContent.bind(this)} >
          <View style={styles.container}>
            <OptionsMenuContext>
              <Header
                onPress={() => this.splitView.openPane()}
                title = {this.getTitle()}
                style = {styles.header}
              />
              <View style={styles.content}>
                {this.renderContent()}
              </View>
            </OptionsMenuContext>
            <Footer style={styles.footer}/>
          </View>
        </SplitViewWindows>
      )
    }

    getTitle(){
      switch(this.props.activeTab){
        case 'watchfaces':
          return "Watch Faces";
        case 'apps':
          return "Applications";
        case 'utils':
          return "Utilities";
        case 'exts':
          return "Extensions";
        case 'watches':
          return "Watches";
        case 'settings':
          return "Settings";
      }
      return "Unknown";
    }

    _closePane() {
      this.splitView.closePane();
    }

    renderContent(){
      switch(this.props.activeTab){
        case 'watchfaces':
          return (<WatchSetsContainer />);
        case 'apps':
          return (<ApplicationsContainer/>);
        case 'utils':
          return (<UtilitiesContainer/>);
        case 'exts':
          return (<ExtensionsContainer/>);
        case 'watches':
          return <DevicesContainer/>;
        case 'settings':
          return (<SettingsContainer/>);
      }
      return (
        <Text>Unknown</Text>
      );
    }

  _renderPaneContent() {
    return (
      <Menu
        closePane={this._closePane.bind(this)}/>
    );
  }
}

Main.propTypes = {
  activeDevice: PropTypes.object,
  activeTab: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
    justifyContent: 'space-between'
  },
  header: {

  },
  content: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  footer: {

  },
});

export default Main;
