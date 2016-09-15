import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

class Header extends React.Component{
  constructor(props:{
    title: ?string,
    onPress: Function,
    style: ?any,
  }){
    super(props);
  }

  render(): ?ReactElement {
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
      </View>
    );
  }
}

var styles = StyleSheet.create({
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

module.exports = Header;
