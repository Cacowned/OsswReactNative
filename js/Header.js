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
import OptionsMenu from './components/menu/OptionsMenu';

class Header extends React.Component{
  optionsMenu : OptionsMenu;

  constructor(props: Object){
    super(props);
  }

  setOptionsMenu(options: Object[]){
    this.optionsMenu.setOptionsMenu(options);
  }

  render() {
    return(
      <View style ={[styles.header, this.props.style]}>
        <TouchableHighlight underlayColor='transparent'
          onPress={this.props.onPress}
          style={styles.button}>
          <Image
            source={require('./Images/hamburger.png')}
            style={styles.image}/>
        </TouchableHighlight>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <OptionsMenu ref={(ref)=>this.optionsMenu = ref}/>
      </View>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.any,
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
  image:{
    flex: 1,
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
