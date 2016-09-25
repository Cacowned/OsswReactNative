/* @flow */

'use strict';

var React = require('React');
var View = require('View');
var Text = require('Text');
var Image = require('Image');
var TouchableHighlight = require('TouchableHighlight');
var StyleSheet = require('StyleSheet');
var ListView = require('ListView');

import { NativeAppEventEmitter } from 'react-native';
import BleManager from '../Ble/BleManager';
import type { Device } from '../reducers/deviceScanning';
import { getFoundDevices} from '../reducers/deviceScanning';
import DeviceItem from '../components/devices/DeviceItem';

import { deviceFound } from '../actions'

var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

var { selectDevice } = require('../actions');
var { connect } = require('react-redux');

const osswUartUuid = '58c6000120b7490496facba8e1b95702';

class WatchesView extends React.Component{

  props: {
    onDeviceSelected: (device:Object ) => void;
    selectedDevice: Object;
    // shouldScan: boolean;
  };

  constructor(props){
    super(props);

    // this._data = [];
    var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows([]),
      hasWatches: false,
    }

    RCTDeviceEventEmitter.addListener('BleManagerDiscoverPeripheral',
      this.handleDiscoverPeripheral.bind(this));

    // if(this.props.shouldScan) {
    //   // this.handleScan();
    //   setTimeout(()=>this.handleScan(), 1000);
    // }
  }

  handleScan(){
    BleManager.scan(osswUartUuid).then((resolve) => console.log('Scanning done'), (reject) => console.log('failed ' + reject));
  }

  handleDiscoverPeripheral(data: Device){
    console.log('Got ble data', data);
    // this.setState({
    //   hasWatches: true,
    //   dataSource: this.state.dataSource.cloneWithRows({data}),
    // });
    this.props.onDeviceFound(data);
  }

  componentWillUnmount(){
    BleManager.stopScan();
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
          renderRow={(data)=><DeviceItem {...data}/>}/>
      );
    } else{
      return (
        <Text style={styles.text}>No watch found</Text>
      );
    }
  }

  selectWatch(data: Device) {
    console.log('selecting ' + data.name);
    this.props.onDeviceSelected(data);
  }

  renderRow(data) {
    var textStyle;
    if(data.state === "Disconnected"){
      textStyle = styles.disconnected;
    }
    return (
      <TouchableHighlight
        onPress={this.selectWatch.bind(this, data)}
        underlayColor='transparent'>
        <View>
          <View style={styles.row}>
            <View style={styles.itemContainer}>
              <Text style={textStyle}>{data.name}</Text>
              <Text style={textStyle}>{data.state}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.itemContainer}>
              <Text style={[styles.subtext,textStyle]}>{data.address}</Text>
              <Text style={[styles.subtext,textStyle]}>{data.rssi}</Text>
            </View>
          </View>
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
  row: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  itemContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  image: {
    width: 34,
    height: 50,
    marginRight: 20,
  },
  text: {
    padding: 10,
  },
  subtext: {
    fontSize: 12,
    // color: 'gray',
  },
  disconnected: {
    color: '#777',
  }
});

function select(store) {
  return {
    // selectedDevice: store.deviceScanning.device,
    devices: getFoundDevices(store.devices),
    // shouldScan: store.devices.shouldScan,
  };
}

function actions(dispatch) {
  return {
    onDeviceSelected: (device)=>{
      dispatch(selectDevice(device));
    },
    onDeviceFound: (device) => {
      dispatch(deviceFound(device));
    },
  };
}

module.exports = connect(select, actions)(WatchesView);
