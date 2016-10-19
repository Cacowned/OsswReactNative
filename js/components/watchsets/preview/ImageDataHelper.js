'use strict';
const base64 = require('base64-js');

export default function getImageData(id, resources){
  var image64 = resources.filter((item)=>item.id===id)[0];
  return base64.toByteArray(image64.data);
}
