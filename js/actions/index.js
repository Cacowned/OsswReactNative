/* @flow */

'use strict';

const navigationActions = require('./navigation');
const deviceScanningActions = require('./deviceScanning');
const watchSetsActions = require('./watchsets');

module.exports = {
  ...navigationActions,
  ...deviceScanningActions,
  ...watchSetsActions,
};
