/* @flow */

'use strict';
var React = require('React');
var StyleSheet = require('StyleSheet');
var Text = require('Text');
var View = require('View');
var WatchesView = require('./Views/Watches');
var Header = require('./Header');
var Menu = require('./Menu');

var { connect } = require('react-redux');

const Dimensions = require('Dimensions');
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
            />
            <View styles={styles.content}>
              {this.renderContent()}
            </View>
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
      return (
        <Text>Unknown</Text>
      );
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
          return <WatchesView/>;
        case 'settings':
          return (<Text>Settings</Text>);
      }
      return (
        <Text>Unknown</Text>
      );
    }

  _renderPaneContent() {
    console.log(this);
    return (
      <Menu
        style = {styles.paneContentWrapper}
        closePane={this._closePane.bind(this)}/>
    );
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

function select(store){
  return {
    activeTab: store.navigation.tab,
  };
}

module.exports = connect(select)(Main);
