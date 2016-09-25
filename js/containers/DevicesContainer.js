/* @flow */

'use strict';

import React, {PropTypes} from 'react';
import BleManager from '../Ble/BleManager';
import {getFoundDevices} from '../reducers/deviceScanning';
import { deviceFound } from '../actions';
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

  render(){
    return (
      <DevicesList devices={this.props.devices}/>
    );
  }
}

const mapStateToProps = state => ({
  devices: getFoundDevices(state.devices),
});

const mapDispatchToProps = dispatch =>{
  return {
    onDeviceFound: (device) => {
      dispatch(deviceFound(device));
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DevicesContainer);
