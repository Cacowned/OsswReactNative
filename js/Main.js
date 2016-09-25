/* @flow */

'use strict';
var React = require('React');
var StyleSheet = require('StyleSheet');
var Text = require('Text');
var View = require('View');
var WatchesView = require('./Views/Watches');
import Header from './Header';
var Menu = require('./Menu');
var Footer = require('./Footer');

import DevicesContainer from './containers/DevicesContainer';

var { connect } = require('react-redux');

const SplitViewWindows = require('SplitViewWindows');
const DRAWER_WIDTH_LEFT = 280;

class Main extends React.Component {

  constructor(props: Props) {
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
              setOptionsMenu={()=>this.getOptionsMenu()}
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

    getOptionsMenu(){
      switch(this.props.activeTab){
        case 'watches':
          return "Scan";
      }
      return '';
    }

    _closePane() {
      this.splitView.closePane();
    }

    renderContent(){
      switch(this.props.activeTab){
        case 'watchfaces':
          return (<Text>Watch Faces</Text>);
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

function select(store){
  return {
    activeTab: store.navigation.tab,
  };
}

module.exports = connect(select)(Main);
