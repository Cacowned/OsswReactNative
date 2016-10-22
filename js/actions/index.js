/* @flow */

'use strict';

const navigationActions = require('./navigation');
const deviceScanningActions = require('./deviceScanning');
const watchSetsActions = require('./watchsets');
const settingsActions = require('./settings');

module.exports = {
  ...navigationActions,
  ...deviceScanningActions,
  ...watchSetsActions,
  ...settingsActions,
};
