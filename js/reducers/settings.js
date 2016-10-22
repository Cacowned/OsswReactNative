/* @flow */
'use strict';

import type {Action} from '../actions/types';

import {
  REHYDRATE_SETTINGS, TOGGLE_AUTO_SYNC,
} from '../actions/settings';

export type Settings = {
  autoSynchronizeTime: boolean;
}

const initialState = {
  autoSynchronizeTime: true,
}

function settings(state: Settings = initialState, action: Action) : Settings {
  switch (action.type) {
    case TOGGLE_AUTO_SYNC:
      return {
        ...state,
        autoSynchronizeTime: !state.autoSynchronizeTime,
      };
    case REHYDRATE_SETTINGS:
      return action.settings;
    default:
      return state;
  }
}

export default settings;
