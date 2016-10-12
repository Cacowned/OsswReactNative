/* @flow */
'use strict';
var FilePickerManager = require('NativeModules').FilePickerManager;
var FSManager = require('NativeModules').FSManager;

import { saveWatchset } from '../store/storageManager';

import type { Action, ThunkAction } from './types';
import type { WatchSet } from '../reducers/watchsets';

export const SELECT_WATCHSET = 'SELECT_WATCHSET';
export const IMPORT_WATCHSET = 'IMPORT_WATCHSET';
export const REHYDRATE_WATCHSETS = 'REHYDRATE_WATCHSETS';

export const selectWatchset = (watchset: WatchSet) => ({
  type: SELECT_WATCHSET,
  watchset,
}:any);

export const rehydrateWatchSets = (watchsets: WatchSet[]) => ({
  type: REHYDRATE_WATCHSETS,
  watchsets,
}:any);

export const importWatchSet = () :ThunkAction => {
  return (dispatch, getState) => {

    FilePickerManager.showFilePicker({
      viewMode: "list",
      fileTypeFilter: ".json",
    })
      .then((result: string)=>{
        FSManager.readFile(result)
          .then((result) => {
            var watchset : WatchSet = JSON.parse(result);

            saveWatchset(watchset);

            dispatch(({
              type: IMPORT_WATCHSET,
              watchset,
            }:any));
          });
      });
  };
};
