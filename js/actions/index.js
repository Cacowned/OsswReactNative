/* @flow */

'use strict';

const navigationActions = require('./navigation');
const watchesActions = require('./watches');

module.exports = {
  ...navigationActions,
  ...watchesActions,
};
