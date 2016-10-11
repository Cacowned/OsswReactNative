/* @flow */

'use strict';
import React, { PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';

var WatchesView = require('./Views/Watches');
import Header from './Header';
var Menu = require('./Menu');
var Footer = require('./Footer');

import DevicesContainer from './containers/DevicesContainer';
import WatchSetsContainer from './containers/WatchSetsContainer';

import type { OptionItem } from './options/types';

var FilePickerManager = require('NativeModules').FilePickerManager;
var FSManager = require('NativeModules').FSManager;

const SplitViewWindows = require('SplitViewWindows');
const DRAWER_WIDTH_LEFT = 280;

class Main extends React.Component {

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
            <Header
              onPress={() => this.splitView.openPane()}
              title = {this.getTitle()}
              style = {styles.header}
              optionsMenu={this.getOptionsMenu()}
            />
            <View style={styles.content}>
              {this.renderContent()}
            </View>
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

    getOptionsMenu(): OptionItem{
      switch(this.props.activeTab){
        case 'watches':
          return {
            title:"Scan",
            action: ()=>{
              this.onToggleScan();
            }
          }
          // return "Scan";
        case "watchfaces":
        return {
          title: "Import",
          action: ()=>{
            FilePickerManager.showFilePicker({
              viewMode: "list",
              fileTypeFilter: ".json",
            })
              .then((result: string)=>{
                FSManager.readFile(result)
                  .then((result) => {
                    debugger;
                    console.log(result);
                  })
              }
              );
          },
        };
          // return "Import";
      }
      return {
        title: "",
        action: ()=>{

        },
      };
      // return '';
    }

    onToggleScan() {
      if(this.props.isScanning){
        this.props.stopScanning();
      }else{
        this.props.startScanning();
      }
    }

    _closePane() {
      this.splitView.closePane();
    }

    renderContent(){
      switch(this.props.activeTab){
        case 'watchfaces':
          return (<WatchSetsContainer/>);
        case 'apps':
          return (<Text>Applications</Text>);
        case 'utils':
          return (<Text>Utilities</Text>);
        case 'exts':
          return (<Text>Extensions</Text>);
        case 'watches':
          return <DevicesContainer/>;
        case 'settings':
          return (<Text>Settings</Text>);
      }
      return (
        <Text>Unknown</Text>
      );
    }

  _renderPaneContent() {
    return (
      <Menu
        style = {styles.paneContentWrapper}
        closePane={this._closePane.bind(this)}/>
    );
  }
}

Main.propTypes = {
  activeDevice: PropTypes.object,
  activeTab: PropTypes.string.isRequired,
  isScanning: PropTypes.bool.isRequired,
  startScanning: PropTypes.func.isRequired,
  stopScanning: PropTypes.func.isRequired,
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
