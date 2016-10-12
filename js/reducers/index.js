/* @flow */

'use strict';

import { combineReducers } from 'redux';
import devices, * as fromDevices from './deviceScanning';
import navigation from './navigation';
import watchsets, * as fromWatchSets from './watchsets';

export default combineReducers({
  navigation,
  devices,
  watchsets,
  });

// module.exports = combineReducers({
//   navigation: require('./navigation'),
//   deviceScanning: require('./deviceScanning'),
// });
