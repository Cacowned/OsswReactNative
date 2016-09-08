import React, { Component } from 'react';
import {
  StyleSheet,
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
    super();
  }

  render(): ?ReactElement {
    return(
      <View style ={[styles.header, this.props.style]}>
        <TouchableHighlight
          onPress={this.props.onPress}
          style={[styles.button]}>
          <Text
            style={[styles.menu]}>
          Menu
          </Text>
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
  },
  button:{
    backgroundColor: 'blue',
    height: 36,
    padding: 8,
  },
  menu:{
    color: 'white',
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  titleContainer:{
    alignItems: 'center',
    flex: 1,
    padding: 6,
  },
  title:{
    fontSize: 17,
    fontWeight: '500',
  }
});

module.exports = Header;
