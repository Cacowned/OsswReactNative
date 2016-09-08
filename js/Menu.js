import React, {
  Component
}
from 'react';
import {
  StyleSheet,
  Text,
  View
}
from 'react-native';

class Menu extends Component {
  render() {
    return (
      <View>
        <Text style = {styles.welcome}>
          Welcome!
        </Text>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#E9EAED',
  },
});

module.exports = Menu;
