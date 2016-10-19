/* @flow */
'use strict';

import React, { PropTypes } from 'react';
import ReactNative, {
  View,
} from 'react-native';

import Win2DCanvas from './Win2DCanvas';

class WatchControl extends React.Component{
  canvas:Win2DCanvas;
  render(){
    return(
      <Win2DCanvas
        {...this.props}
        ref={(ref) => this.canvas=ref} />
    );
  }

  invalidate(){
    this.canvas.invalidate();
  }

  drawImage(image:number[], x:number, y:number, width:number, height:number){
    this.drawBitmap(image, 4, x, y, width, height, image[2]);
  }

  drawBitmap(bitmap:number[], offset:number, posx:number, posy:number,
    width:number, height:number, bitmapWidth:number){
      var bitmapByteWidth = Math.floor((bitmapWidth+7)/8);
      for(var y = 0; y < height; y++){
        for(var x = 0; x<width; x++){
          var val = ((bitmap[offset+(bitmapByteWidth*y)+Math.floor(x/8)]>>( 7-(x%8)))&0x1)!=0;
          this.canvas.drawRectangle(posx+x, posy+y, 1, 1, val?'white':'black', true);
        }
      }
  }

  drawDigit(digit:number, x:number, y:number,
            width:number, height:number, thickness:number){
    if(digit != 1 && digit != 4){
      this.canvas.drawRectangle(x, y, width, thickness, 'white', true);
    }

    if(digit != 5 && digit != 6){
      this.canvas.drawRectangle(x + width - thickness, y,
        thickness, (height+1)/2, 'white', true);
    }

    if(digit != 2){
      this.canvas.drawRectangle(x+width-thickness, y+height/2,
        thickness, (height+1)/2, 'white', true);
    }

    if(digit != 1 && digit != 4 && digit != 7){
      this.canvas.drawRectangle(x, y+height-thickness,
        width, thickness, 'white', true);
    }

    if(digit ==2 || digit == 6 || digit == 8 || digit == 0){
      this.canvas.drawRectangle(x, y+height/2, thickness,
        (height+1)/2, 'white', true);
    }

    if(digit != 1 && digit != 2 && digit != 3 && digit != 7){
      this.canvas.drawRectangle(x, y, thickness, (height+1)/2, 'white', true);
    }

    if(digit != 1 && digit != 7 && digit != 0){
      this.canvas.drawRectangle(x, y + ((height - thickness)/2),
        width, thickness, 'white', true);
    }
  }
}

WatchControl.propTypes = {
  clearColor: PropTypes.any,
  ...View.propTypes
};

module.exports = WatchControl;