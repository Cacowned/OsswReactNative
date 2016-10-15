/* @flow */

'use strict';

const navigationActions = require('./navigation');
const deviceScanningActions = require('./deviceScanning');
const watchSetsActions = require('./watchsets');
const optionsMenu = require('./optionsMenu');

module.exports = {
  ...navigationActions,
  ...deviceScanningActions,
  ...watchSetsActions,
  ...optionsMenu,
};
