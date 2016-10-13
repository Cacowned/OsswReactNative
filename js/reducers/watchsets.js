/* @flow */
'use strict';

import {
  REHYDRATE_WATCHSETS, IMPORT_WATCHSET,
  SELECT_WATCHSET,
} from '../actions/watchsets';

import { combineReducers } from 'redux';

type Control = {
  type: 'number' | 'text' | 'progress' | 'image' | 'imageFromSet';
  position: {x: number, y: number};
  style: Object;
  image: Object;
}

type Screen = {
  id: string;
  controls: Control[];
}

type WatchSetData = {
  screens: Screen[];
}

export type WatchSet = {
  name: string;
  type: 'fae';
  apiVersion: number;
  data: WatchSetData;
}

type WatchSetItem = {
  watchset: WatchSet;
  isSelected: boolean;
}

const watchsets = (state, action) =>{
  switch(action.type){
    case SELECT_WATCHSET:
    return {
      ...state,
      isSelected: !state.isSelected,
    }
    default:
      return state;
  }
};

const byName = (state={}, action) =>{
    switch(action.type){
      case REHYDRATE_WATCHSETS:
        return {
          ...state,
          ...action.watchsets.reduce((obj, watchset) => {
            obj[watchset.name] = watchset;
            return obj;
          },{})
        }
      case IMPORT_WATCHSET:
        return {
          ...state,
          [action.watchset.name]: action.watchset,
        }
      default:
        const {watchsetname} = action;
        if(watchsetname){
          return {
            ...state,
            [watchsetname]: watchsets(state[watchsetname], action),
          };
        }
        return state;
    }
}

const storedWatchSets = (state = [], action) => {
  switch (action.type) {
    case REHYDRATE_WATCHSETS:
      return action.watchsets.map((watchset)=>watchset.name);
    case IMPORT_WATCHSET:
      return state.concat(action.watchset.name);
    default:
      return state;
  }
};

export default combineReducers({
  byName,
  storedWatchSets,
});

export const getWatchset = (state: Object, name: String) =>
  state.byName[name];

export const getAllWatchSets = (state : Object) =>
  state.storedWatchSets.map(name => getWatchset(state, name));
