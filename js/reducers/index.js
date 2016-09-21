/* @flow */

'use strict';

var { combineReducers } = require('redux');

module.exports = combineReducers({
  navigation: require('./navigation'),
  watches: require('./watches'),
});
