/* @flow */
'use strict';

import type { Action, ThunkAction } from './types';
import type { Settings } from '../reducers/settings';
import {
  saveSettings,
  getSettings,
} from '../store/storageManager';

export const REHYDRATE_SETTINGS = 'REHYDRATE_SETTINGS';
export const TOGGLE_AUTO_SYNC = 'TOGGLE_AUTO_SYNC';

export const toggleAutoSync = () : ThunkAction => (dispatch, getState) => {
  dispatch(({
    type: TOGGLE_AUTO_SYNC,
  }:any));

  saveSettings(getState().settings);
};

export const rehydrateSettings = (settings: Settings) => ({
  type: REHYDRATE_SETTINGS,
  settings,
}:any);
