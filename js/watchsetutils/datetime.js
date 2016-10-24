/* @flow */
'use strict';

var base64 = require('base64-js');

export function getDateTimeAsBase64(){
  var d = new Date();
  var n = (d.getTime() - 60000*d.getTimezoneOffset())/1000;
  var date = new Uint8Array(5);
  date[0] = 0x10;
  date[1] = n >> 24;
  date[2] = (n >> 16) & 0xff;
  date[3] = (n >> 8) & 0xff;
  date[4] = n & 0xff;

  return base64.fromByteArray(date);
}
