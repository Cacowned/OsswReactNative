/* @flow */

'use strict';

import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

class Header extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    return(
      <View style ={[styles.header, this.props.style]}>
        <TouchableHighlight underlayColor='transparent'
          onPress={this.props.onPress}
          style={[styles.button]}>
          <Image
            source={require('./Images/hamburger.png')}
            style={[styles.menu]}/>
        </TouchableHighlight>
        <View style={[styles.titleContainer]}>
          <Text style={[styles.title]}>{this.props.title}</Text>
        </View>
        <TouchableHighlight
          underlayColor='transparent'
          onPress={this.props.optionsMenu.action}
          style={[styles.button, styles.options]}>
            <Text style={styles.optionItem}>{this.props.optionsMenu.title}</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.any,
  optionsMenu: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  header:{
    flexDirection: 'row',
    backgroundColor: '#424242',
    padding: 10,
  },
  button:{
    padding: 8,
  },
  menu:{
    flex: 1,
  },
  options:{
    justifyContent: 'center',
  },
  optionItem:{
    color: 'white',
  },
  titleContainer:{
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
    padding: 6,
    marginLeft: 10,
  },
  title:{
    fontSize: 17,
    fontWeight: '500',
    color: 'white'
  }
});

export default Header;
