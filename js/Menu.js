/* @flow */

'use strict';

var React = require('React');
var StyleSheet = require('StyleSheet');
var TouchableHighlight = require('TouchableHighlight');
var Image = require('Image');
var Text = require('Text');
var View = require('View');
var MenuItem = require('./MenuItem');

var { switchTab } = require('./actions');
var { connect } = require('react-redux');

import type { Tab } from './reducers/navigation';

var headerImg = require('./Images/header.png');

class Menu extends React.Component {

  props: {
    onTabSelect: (tab: Tab)=> void;
    tab: Tab;
    closePane: () => void;
  };

  constructor(props) {
    super(props);
  }


  onTabSelect(tab: Tab) {
    if(this.props.tab !== tab){
      this.props.onTabSelect (tab);
    }
    this.props.closePane();
  }

  render() {
    return (
      <View style={styles.menu}>
        <Image style={styles.headerImage} source={headerImg}/>
        <MenuItem
          title="Watch Faces"
          icon={require('./Images/ic_watchface.png')}
          selectedIcon={require('./Images/ic_watchface_active.png')}
          selected={this.props.tab === 'watchfaces'}
          onPress={this.onTabSelect.bind(this, 'watchfaces')}/>
        <MenuItem
          title="Applications"
          icon={require('./Images/ic_categorize.png')}
          selectedIcon={require('./Images/ic_categorize_active.png')}
          selected={this.props.tab === 'apps'}
          onPress={this.onTabSelect.bind(this, 'apps')}/>
        <MenuItem
          title="Utilities"
          icon={require('./Images/ic_tools.png')}
          selectedIcon={require('./Images/ic_tools_active.png')}
          selected={this.props.tab === 'utils'}
          onPress={this.onTabSelect.bind(this, 'utils')}/>
        <MenuItem
          title="Extensions"
          icon={require('./Images/ic_extension.png')}
          selectedIcon={require('./Images/ic_extension_active.png')}
          selected={this.props.tab === 'exts'}
          onPress={this.onTabSelect.bind(this, 'exts')}/>
        <MenuItem
          title="Watches"
          icon={require('./Images/ic_watch.png')}
          selectedIcon={require('./Images/ic_watch_active.png')}
          selected={this.props.tab === 'watches'}
          onPress={this.onTabSelect.bind(this, 'watches')}/>
        <MenuItem
          title="Settings"
          icon={require('./Images/ic_settings.png')}
          selectedIcon={require('./Images/ic_settings_active.png')}
          selected={this.props.tab === 'settings'}
          onPress={this.onTabSelect.bind(this, 'settings')}/>
        <MenuItem
          title="Exit"
          icon={require('./Images/ic_exit.png')}
          selectedIcon={require('./Images/ic_exit_active.png')}
          selected={this.props.tab === 'exit'}
          onPress={this.onTabSelect.bind(this, 'exit')}/>
        </View>
    );
  }
};

function select(store) {
  return {
    tab: store.navigation.tab,
  };
}

function actions(dispatch) {
  return {
    onTabSelect: (tab) => {
      dispatch(switchTab(tab));},
  };
}

const styles = StyleSheet.create({
  menu: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  headerImage: {
    // flex: .005,
    width: 280,
    // resizeMode: 'contain',
    alignItems: 'flex-start',
    backgroundColor: 'red',
    height: 131.25
  },
});

module.exports = connect(select, actions)(Menu);
