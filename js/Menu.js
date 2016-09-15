'use strict';

import React, {
  Component
}
from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  View
}
from 'react-native';
var MenuItem = require('./MenuItem');
import type {MenuItemType} from './MenuItems';

var headerImg = require('./Images/header.png');

class Menu extends React.Component {

  constructor(props) {
    super(props);
  }

  props: {
    onNavigateRequested: (menuItem: MenuItemType)=> void;
    menuItem: MenuItemType;
  };

  onMenuItemSelect(menuItem: MenuItemType){
    if(this.props.menuItem !== menuItem){
      this.props.onNavigateRequested (menuItem);
    }
  }

  render() {
    return (
      <View style={styles.menu}>
        <Image style={styles.headerImage} source={headerImg}/>
        <MenuItem
          title="Watch Faces"
          icon={require('./Images/ic_watchface.png')}
          selectedIcon={require('./Images/ic_watchface_active.png')}
          selected={this.props.menuItem === 'watchfaces'}
          onPress={this.onMenuItemSelect.bind(this, 'watchfaces')}/>
        <MenuItem
          title="Applications"
          icon={require('./Images/ic_categorize.png')}
          selectedIcon={require('./Images/ic_categorize_active.png')}
          selected={this.props.menuItem === 'apps'}
          onPress={this.onMenuItemSelect.bind(this, 'apps')}/>
        <MenuItem
          title="Utilities"
          icon={require('./Images/ic_tools.png')}
          selectedIcon={require('./Images/ic_tools_active.png')}
          selected={this.props.menuItem === 'utils'}
          onPress={this.onMenuItemSelect.bind(this, 'utils')}/>
        <MenuItem
          title="Extensions"
          icon={require('./Images/ic_extension.png')}
          selectedIcon={require('./Images/ic_extension_active.png')}
          selected={this.props.menuItem === 'exts'}
          onPress={this.onMenuItemSelect.bind(this, 'exts')}/>
        <MenuItem
          title="Watches"
          icon={require('./Images/ic_watch.png')}
          selectedIcon={require('./Images/ic_watch_active.png')}
          selected={this.props.menuItem === 'watches'}
          onPress={this.onMenuItemSelect.bind(this, 'watches')}/>
        <MenuItem
          title="Settings"
          icon={require('./Images/ic_settings.png')}
          selectedIcon={require('./Images/ic_settings_active.png')}
          selected={this.props.menuItem === 'settings'}
          onPress={this.onMenuItemSelect.bind(this, 'settings')}/>
        <MenuItem
          title="Exit"
          icon={require('./Images/ic_exit.png')}
          selectedIcon={require('./Images/ic_exit_active.png')}
          selected={this.props.menuItem === 'exit'}
          onPress={this.onMenuItemSelect.bind(this, 'exit')}/>
        </View>
    );
  }
};

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

module.exports = Menu;
