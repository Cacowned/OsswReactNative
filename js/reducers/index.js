/* @flow */

'use strict';

import { combineReducers } from 'redux';
import devices, * as fromDevices from './deviceScanning';
import navigation from './navigation';

export default combineReducers({
  navigation,
  devices,
  });

// module.exports = combineReducers({
//   navigation: require('./navigation'),
//   deviceScanning: require('./deviceScanning'),
// });
