/* @flow */
'use strict';

import React, { PropTypes } from 'react';
import { View, StyleSheet} from 'react-native';
import OptionsMenuItem from './OptionsMenuItem';

class OptionsMenu extends React.Component {
  constructor(props: Object) {
    super(props);
    this.state = {
      options: [],
    };
  }

  componentDidMount(){
    this.context.registerOptionsMenu(this);
  }
  componentWillUnmount(){
    this.context.unregisterOptionsMenu();
  }

  setOptionsMenu(opts:Object[]){
    this.setState({
      options: opts
    });
  }

  render (){
    var children = this.state.options.reduce((obj, item)=>{
      obj.push((
        <OptionsMenuItem menuItem={item} key={item.title}/>
      ));
      return obj;
    }, []);

    return (
      <View style={styles.container}>
        {children}
      </View>
    );
  }
}

OptionsMenu.contextTypes={
    registerOptionsMenu: React.PropTypes.func,
    unregisterOptionsMenu: React.PropTypes.func,
};

const styles = StyleSheet.create({
  container:{
    justifyContent: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default OptionsMenu;
