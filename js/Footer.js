/* @flow */

'use strict';

var React = require('React');
var StyleSheet = require('StyleSheet');
var Text = require('Text');
var View = require('View');
var Image = require('Image');

var { connect } = require('react-redux');
import { Device } from './reducers/deviceScanning';

class Footer extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={styles.container}>
        <Image source={require('./Images/watch.png')} style={styles.image}/>
        <Text>{this.getDeviceName()}</Text>
      </View>
    );
  }

  getDeviceName(){
    // if(this.props.device !== null){
    //   return this.props.device.name;
    // }
    return "No watch";
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#15CAB1',
    paddingLeft: 16,
    paddingRight: 16,
    height: 56,
    flexDirection: 'row',
    alignItems:'center',
  },
  image: {
    width: 34,
    height: 50,
    marginRight: 20,
  }
});

Footer.propTypes = {
  device: React.PropTypes.object,
};

function select(store){
  return {
    // device: store.deviceScanning.device,
  };
}

module.exports = connect(select)(Footer);
