/* @flow */
'use strict';

import WatchConstants from './constants';
import getImageData from './ImageDataHelper';
var base64 = require('base64-js');

export function compileWatchSet(watchSet : Object){

  var data = watchSet.data;
  var resources = data.resources;
  var screens = data.screens;
  var dataLength = 15;

  var resourcesData = new Uint8ClampedArray(0);
  var parsedresources = parseResources(resources);
  if(resources != null){
    resourcesData = compileResources(parsedresources);
    dataLength += 3 + resourcesData.length;
  }

  var extensionPropertiesData = new Uint8ClampedArray(1);
  dataLength += extensionPropertiesData.length;

  var screensData = compileScreensSection(screens, parsedresources);
  dataLength += screensData.length;

  var data = new Uint8ClampedArray(dataLength);
  // magic number
  data[0] = 0x05;
  data[1] = 0x53;
  // format version
  data[2] = 0x0;
  data[3] = 0x1;
  // write watch set id
  var id = generateWatchSetId(watchSet);
  data[4] = id >> 24;
  data[5] = id >> 16;
  data[6] = id >> 8;
  data[7] = id;
  data[8] = WatchConstants.WATCH_SET_SECTION_SCREENS;

  data[9] = screensData.length >> 8;
  data[10] = screensData.length;
  data.set(screensData, 11)

  var length = screensData.length + 12;

  data[length] = WatchConstants.WATCH_SET_SECTION_EXTERNAL_PROPERTIES;
  data[length+1] = extensionPropertiesData.length >> 8;
  data[length+2] = extensionPropertiesData.length;
  data.set(extensionPropertiesData, length+3);
  length += 4 + extensionPropertiesData.length;

  if(resources != null){
    data[length] = WatchConstants.WATCH_SET_SECTION_RESOURCES;
    data[length+1] = resourcesData.length >> 8;
    data[length+2] = resourcesData.length;
    data.set(resourcesData, length+3);
    length += 4 + resourcesData.length;
  }
  data[length] = WatchConstants.WATCH_SET_END_OF_DATA;
}

function generateWatchSetId(watchSet) : number{
  return 1;
}

function parseResources(resources: Object[]){
  if(resources){
    return resources.map(function(obj){
      var rObj = {};
      rObj[obj.id] = base64.toByteArray(obj.data);
      return rObj;
    });
  }
  return [];
}

function compileResources(resources: Object[]){
  return new Uint8ClampedArray();
}

function compileScreensSection(screens: Object[]){
  return new Uint8ClampedArray();
}
