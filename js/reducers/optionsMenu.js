/* @flow */
'use strict';

import {
  CREATE_OPTIONS_MENU
} from '../actions';

import { combineReducers } from 'redux';

const optionsMenu = (state = [], action) => {
  switch (action.type) {
    case CREATE_OPTIONS_MENU:
      return action.options;
    default:
      return state;
  }
};

export default combineReducers({
  optionsMenu,
});
