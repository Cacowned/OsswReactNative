/* @flow */
'use strict';

import WatchConstants from './constants';
var base64 = require('base64-js');

export function compileWatchSet(watchSet : Object){
debugger;
  var data = watchSet.data;
  var resources = data.resources;
  var screens = data.screens;
  var dataLength = 15;

  var resourcesData = new Uint8ClampedArray(0);
  var parsedresources = parseResources(resources);
  if(resources != null){
    resourcesData = compileResources(resources);
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
  data[4] = (id >> 24)&0xff;
  data[5] = (id >> 16)&0xff;
  data[6] = (id >> 8)&0xff;
  data[7] = id&0xff;
  data[8] = WatchConstants.WATCH_SET_SECTION_SCREENS;

  data[9] = screensData.length >> 8;
  data[10] = screensData.length;
  data.set(screensData, 11)

  var length = screensData.length + 12;

  data[length] = WatchConstants.WATCH_SET_SECTION_EXTERNAL_PROPERTIES;
  data[length+1] = extensionPropertiesData.length >> 8;
  data[length+2] = extensionPropertiesData.length;
  data.set(extensionPropertiesData, length+3);
  length += 3 + extensionPropertiesData.length;

  if(resources != null){
    data[length] = WatchConstants.WATCH_SET_SECTION_RESOURCES;
    data[length+1] = resourcesData.length >> 8;
    data[length+2] = resourcesData.length;
    data.set(resourcesData, length+3);
    length += 3 + resourcesData.length;
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

function compileExternalProperties(){

}

function compileResources(resources: Object[]){
debugger;
  var resourceDataOffset = 1 + (resources.length*3);
  var resourcesData = [];
  for(var i = 0; i < resources.length; i++){
    resourcesData.push(base64.toByteArray(resources[i].data));
  }

  var dataLength = resourcesData.reduce((prev,cur)=>prev+cur.length,0);
  dataLength += resourceDataOffset;

  var result = new Uint8ClampedArray(dataLength);
  result[0]=resources.length;
  var offset = 1;
  for(var i = 0; i < resourcesData.length; i++){
    result[offset]=(resourceDataOffset>>16)&0xff;
    result[offset+1]=(resourceDataOffset>>8)&0xff;
    result[offset+2]=resourceDataOffset&0xff;
    offset += 3;
    resourceDataOffset += resourcesData[i].length;
  }

  for(var i = 0; i < resourcesData.length; i++){
    result.set(resourcesData[i], offset);
    offset += resourcesData[i].length;
  }

  return result;
}

function compileScreensSection(screens: Object[]){
  return new Uint8ClampedArray();
}
