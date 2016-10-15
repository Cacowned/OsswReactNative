/* @flow */

'use strict';

import React, {PropTypes} from 'react';
import BleManager from '../Ble/BleManager';
import { getFoundDevices } from '../reducers/deviceScanning';
import {
  deviceFound,
  startScanning,
  stopScanning,
  selectDevice,
  createOptionsMenu,
} from '../actions';
import type { Device } from '../reducers/deviceScanning';
import { connect } from 'react-redux';
import DevicesList from '../components/devices/DevicesList';
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

class DevicesContainer extends React.Component {
  constructor(props){
    super(props);

    RCTDeviceEventEmitter.addListener('BleManagerDiscoverPeripheral',
      this.handleDiscoverPeripheral.bind(this));
  }

  handleDiscoverPeripheral(data: Device){
    this.props.onDeviceFound(data);
  }

  componentWillUnmount(){
    this.props.stopScanning();
  }

  componentDidMount(){
    this.props.createOptionsMenu([{
      title: "Scan",
      action: ()=>{
        if(this.props.isScanning){
          this.props.stopScanning();
        }else{
          this.props.startScanning();
        }
      }
    }]);
  }

  render(){
    return (
      <DevicesList
        devices={this.props.devices}
        onDeviceSelected={(device)=>this.props.deviceSelected(device)}/>
    );
  }
}

const mapStateToProps = state => ({
  devices: getFoundDevices(state.devices),
  isScanning: state.devices.isScanning,
});

const mapDispatchToProps = dispatch =>{
  return {
    onDeviceFound: (device) => {
      dispatch(deviceFound(device));
    },
    startScanning: () =>{
      dispatch(startScanning());
    },
    stopScanning: () =>{
      dispatch(stopScanning());
    },
    deviceSelected: (device) => {
      dispatch(selectDevice(device));
    },
    createOptionsMenu: (options)=>{
      dispatch(createOptionsMenu(options));
    },
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DevicesContainer);
