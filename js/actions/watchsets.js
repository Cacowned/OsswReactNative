/* @flow */
'use strict';
var FilePickerManager = require('NativeModules').FilePickerManager;
var FSManager = require('NativeModules').FSManager;

import {
  saveWatchSet,
  removeWatchSet,
  getWatchSets,
} from '../store/storageManager';

import {
  getAllWatchSets,
} from '../reducers/watchsets'

import type { Action, ThunkAction } from './types';
import type { WatchSet } from '../reducers/watchsets';

export const SELECT_WATCHSET = 'SELECT_WATCHSET';
export const IMPORT_WATCHSET = 'IMPORT_WATCHSET';
export const REHYDRATE_WATCHSETS = 'REHYDRATE_WATCHSETS';

const selectWatchSetUnsafe = (watchsetname) : Action => ({
  type: SELECT_WATCHSET,
  watchsetname,
}:any);

export const selectWatchset = (watchset: WatchSet):ThunkAction => (dispatch,getState)=> {
  if(getState().watchsets.byName[watchset.name]){
    dispatch(selectWatchSetUnsafe(watchset.name));
  }
};

export const rehydrateWatchSets = (watchsets: WatchSet[]) => ({
  type: REHYDRATE_WATCHSETS,
  watchsets,
}:any);

export const deleteSelectedWatchSet = () : ThunkAction =>
  (dispatch, getState) =>{
    var promises = []
    var toBeRemoved = getAllWatchSets(getState().watchsets).filter((item)=>item.isSelected);
    toBeRemoved.forEach((watchset) => {
      promises.push(removeWatchSet(watchset));
    });

    Promise.all(promises).then(()=>{
      return getWatchSets();
    }).then((data)=>{
      dispatch(rehydrateWatchSets(data))
    });
};

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

            saveWatchSet(watchset);

            dispatch(({
              type: IMPORT_WATCHSET,
              watchset,
            }:any));
          });
      });
  };
};
