/* @flow */
'use strict';

import type { Action, ThunkAction } from './types';
import type { Device } from '../reducers/deviceScanning';
import BleManager from '../Ble/BleManager';


const osswUartUuid = '58c6000120b7490496facba8e1b95702';
const batteryServiceUuid = '0000180f00001000800000805f9b34fb';
const batteryCharUuid = '00002a1900001000800000805f9b34fb';

export const STOP_SCANNING = 'STOP_SCANNING';
export const SELECT_DEVICE = 'SELECT_DEVICE';
export const START_SCANNING = 'START_SCANNING';
export const DEVICE_FOUND = 'DEVICE_FOUND';

export const selectDevice = (device: Device): ThunkAction =>{
  return (dispatch) => {
    BleManager.connect(device.address)
      .then(()=>{
        BleManager.read(device.address, batteryServiceUuid, batteryCharUuid)
          .then((data)=>{
            console.log(data);
          });
      });
      dispatch(({
        type: SELECT_DEVICE,
        device: device,
      }:any));
  };
};

export const stopScanning = (): ThunkAction => {
  return (dispatch, getState) => {
    BleManager.stopScan();

    dispatch(({
        type: STOP_SCANNING,
    } : any));
  };
};

export const startScanning = () : ThunkAction => {
  return (dispatch : Function, getState : Function) => {
    BleManager.scan(osswUartUuid);
    dispatch({
      type: START_SCANNING,
    });
  };
};

export const deviceFound = (device: Device): Action => (({
  type: DEVICE_FOUND,
  device,
} : any));

// export const deviceFound = (device: Device) => (dispatch, getState) => {
//   dispatch(_deviceFound(device));
// };
