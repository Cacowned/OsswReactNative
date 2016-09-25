/* @flow */
'use strict';

import type { Action, ThunkAction } from './types';
import type { Device } from '../reducers/deviceScanning';
import BleManager from '../Ble/BleManager';


const osswUartUuid = '58c6000120b7490496facba8e1b95702';

export const STOP_SCANNING = 'STOP_SCANNING';
export const SELECT_DEVICE = 'SELECT_DEVICE';
export const START_SCANNING = 'START_SCANNING';
export const DEVICE_FOUND = 'DEVICE_FOUND';

export const selectDevice = (device: Device): Action =>({
    type: SELECT_DEVICE,
    device,
});

export const stopScanning = (): ThunkAction => {
  return (dispatch) => {
    debugger;
    BleManager.stopScan();

    return dispatch({
        type: STOP_SCANNING,
    });
  };
};

export const startScanning = () => (dispatch, getState) => {
  BleManager.scan(osswUartUuid);

  dispatch({
    type: START_SCANNING,
  });
};

export const deviceFound = (device: Device): Action => ({
  type: DEVICE_FOUND,
  device,
});

// export const deviceFound = (device: Device) => (dispatch, getState) => {
//   dispatch(_deviceFound(device));
// };
