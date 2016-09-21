/* @flow */

'use strict';

var React = require('React');
var View = require('View');
var Text = require('Text');
var Image = require('Image');
var TouchableHighlight = require('TouchableHighlight');
var StyleSheet = require('StyleSheet');
var ListView = require('ListView');
var Clipboard = require('Clipboard');

import { NativeAppEventEmitter } from 'react-native';
import BleManager from '../Ble/BleManager';

var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

var { selectDevice } = require('../actions');
var { connect } = require('react-redux');

const osswUartUuid = '58c6000120b7490496facba8e1b95702';

class WatchesView extends React.Component{

  props: {
    onDeviceSelected: (device:Object ) => void;
    selectedDevice: Object;
  };

  constructor(props){
    super(props);

    this._data = [];

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2}),
      hasWatches: false,
    }

    RCTDeviceEventEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral.bind(this));

    setTimeout(()=>this.handleScan(), 1000);
  }

  handleScan(){
    BleManager.scan(osswUartUuid, true).then((resolve) => console.log('Scanning done'), (reject) => console.log('failed ' + reject));
  }

  handleDiscoverPeripheral(data){
    console.log('Got ble data', data);
    this._data = this._data.concat(data);
    this.setState({
      hasWatches: true,
      dataSource: this.state.dataSource.cloneWithRows(this._data)
    });
  }

  render(){
    return (
      <View style={styles.container}>
        {this.renderContent()}
      </View>
    );
  }

  renderContent() {
    if(this.state.hasWatches){
      return (
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}/>
      );
    } else{
      return (
        <Text style={styles.text}>No watch found</Text>
      );
    }
  }

  selectWatch(data) {
    console.log('selecting '+data.Name);
    this.props.onDeviceSelected(data);
  }

  renderRow(data) {
    return (
      <TouchableHighlight
        onPress={this.selectWatch.bind(this, data)}
        underlayColor='transparent'>
        <View style={styles.itemContainer}>
          <Image
            style={styles.image}
            source={require('../Images/watch.png')}/>
          <Text>{data.Name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 20,
  },
  itemContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 34,
    height: 50,
    marginRight: 20,
  },
  text: {
    padding: 10,
  },
});

function select(store) {
  return {
    selectedDevice: store.watches.device,
  };
}

function actions(dispatch) {
  return {
    onDeviceSelected: (device)=>{
      dispatch(selectDevice(device));
    },
  };
}

module.exports = connect(select, actions)(WatchesView);
