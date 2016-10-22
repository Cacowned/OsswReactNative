/* @flow */

'use strict';

import React from 'react';
import { AsyncStorage } from 'react-native';

const storageKeyPrefix = 'OSSW:';
const storageDeviceKey = storageKeyPrefix + 'device';
const storageWatchSetKey = storageKeyPrefix + 'watchset';
const storageSettingsKey = storageKeyPrefix + 'settings';

import type { Device } from '../reducers/deviceScanning';
import type { WatchSet } from '../reducers/watchsets';
import type { Settings } from '../reducers/settings';

export function setDevice(device : Device){
  return AsyncStorage.setItem(storageDeviceKey, JSON.stringify(device));
}

export function getDevice(){
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(storageDeviceKey)
      .then(result =>
        resolve({
          device: JSON.parse(result)
          }
        )
      ).catch(ex=>reject(ex));
  });
}

export function saveWatchSet(watchset : WatchSet){
  return AsyncStorage.setItem(storageWatchSetKey + ":" + watchset.name, JSON.stringify(watchset));
}

export function removeWatchSet(watchset : WatchSet){
  return AsyncStorage.removeItem(storageWatchSetKey + ":" + watchset.name);
}

var fn = function getWatchSet(key: string){
  return new Promise(resolve => {
    if(key.startsWith(storageWatchSetKey)){
      AsyncStorage.getItem(key)
        .then(result => {
          resolve(JSON.parse(result));
        });
    }
    else{
      resolve();
    }
  });
};

export function getWatchSets(){
  return new Promise((resolve, reject) => {
    AsyncStorage.getAllKeys()
      .then(result => {
        Promise.all(result.map(fn))
          .then((data)=>{
            var filtered = data.filter((value)=>{
              return value != undefined;
            });
            resolve(filtered);
          });
      })
      .catch(ex=>reject(ex));
  });
}

export function getSettings(){
  return new Promise((resolve, reject) =>{
    AsyncStorage.getItem(storageSettingsKey)
    .then(result =>
      resolve({
        settings: JSON.parse(result)
        }
      )
    ).catch(ex=>reject(ex));
  });
}

export function saveSettings(settings: Settings){
  return AsyncStorage.setItem(storageSettingsKey, JSON.stringify(settings));
}
