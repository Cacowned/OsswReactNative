/* @flow */
'use strict';
import React from 'react';
import { View } from 'react-native';

class OptionsMenuContext extends React.Component{
  _menu:Object;

  componentWillMount(){
    this._menu={};
  }

  render(){
    return (
      <View>
        {this.props.children}
      </View>
    );
  }

  _registerOptionsMenu(menu){
    this._menu = menu;
  }

  _unregisterOptionsMenu(){
    delete this._menu;
  }

  _setOptions(options:Object[]){
    this._menu && this._menu.setOptionsMenu(options);
  }

  getChildContext(){
    return {
      setOptions: this._setOptions.bind(this),
      registerOptionsMenu: this._registerOptionsMenu.bind(this),
      unregisterOptionsMenu: this._unregisterOptionsMenu.bind(this),
    };
  }
}

OptionsMenuContext.childContextTypes = {
    setOptions: React.PropTypes.func,
    registerOptionsMenu: React.PropTypes.func,
    unregisterOptionsMenu: React.PropTypes.func,
};

export default OptionsMenuContext;
