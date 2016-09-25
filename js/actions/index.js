/* @flow */

'use strict';

const navigationActions = require('./navigation');
const deviceScanningActions = require('./deviceScanning');

module.exports = {
  ...navigationActions,
  ...deviceScanningActions,
};
