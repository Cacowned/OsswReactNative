/* @flow */

'use strict';

import { combineReducers } from 'redux';
import devices, * as fromDevices from './deviceScanning';
import navigation from './navigation';
import watchsets, * as fromWatchSets from './watchsets';
import settings, * as fromSettings from './settings';

export default combineReducers({
  navigation,
  devices,
  watchsets,
  settings,
  });

// module.exports = combineReducers({
//   navigation: require('./navigation'),
//   deviceScanning: require('./deviceScanning'),
// });
