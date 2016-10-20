/* @flow */
'use strict';

import React, { PropTypes } from 'react';
import ReactNative, {
  View,
} from 'react-native';

import Win2DCanvas from './Win2DCanvas';

import {
  NumberControlRenderer,
  ImageControlRenderer,
  ProgressControlRenderer,
} from './';

class WatchControl extends React.Component{
  canvas:Win2DCanvas;
  foregroundColor:any;
  backgroundColor:any;

  constructor(props:Object){
    super(props);
    this._setColors(props);
  }

  _setColors(props){
    if(props.inverted){
      this.foregroundColor = props.backgroundColor;
      this.backgroundColor = props.foregroundColor;
    }else{
      this.foregroundColor = props.foregroundColor;
      this.backgroundColor = props.backgroundColor;
    }
  }

  componentDidMount(){
    this.drawWatchSet(this.props.watchSet, this.props.showScreen);
  }

  componentWillUpdate(nextProps:Object){
    this._setColors(nextProps);
    this.drawWatchSet(nextProps.watchSet, nextProps.showScreen)
  }

  drawWatchSet(watchset:Object, screenNr:number){
    if(watchset){
      const { screens, resources } = watchset.data;
      if(screenNr < 0 || screenNr >= screens.length){
        return;
      }
      screens[screenNr].controls.forEach((item)=>{
        switch(item.type){
          case "number":
            var ncr = new NumberControlRenderer(item, resources);
            ncr.render(this, 9);
          break;
          case "image":
            new ImageControlRenderer(item, resources).render(this);
          break;
          case "progress":
            new ProgressControlRenderer(item).render(this, 50);
          break;
        }
      });
    }
    else {
      this.drawRectangle(0,0,144,168, false)
      this.canvas.drawLine(0,0, 144, 168, this.foregroundColor);
      this.canvas.drawLine(0,168, 144, 0, this.foregroundColor);
    }
    this.invalidate();
  }

  render(){
    return(
      <Win2DCanvas
        {...this.props}
        clearColor={this.props.clearColor}
        ref={(ref) => this.canvas=ref} />
    );
  }

  invalidate(){
    this.canvas.invalidate();
  }

  drawRectangle(x:number, y:number, width:number, height:number, fill:boolean){
    this.canvas.drawRectangle(x, y, width, height, this.foregroundColor, fill);
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
          this.canvas.drawRectangle(posx+x, posy+y, 1, 1,
            val?this.foregroundColor:this.backgroundColor, true);
        }
      }
  }

  drawDigit(digit:number, x:number, y:number,
            width:number, height:number, thickness:number){
    if(digit != 1 && digit != 4){
      this.canvas.drawRectangle(x, y, width, thickness, this.foregroundColor, true);
    }

    if(digit != 5 && digit != 6){
      this.canvas.drawRectangle(x + width - thickness, y,
        thickness, (height+1)/2, this.foregroundColor, true);
    }

    if(digit != 2){
      this.canvas.drawRectangle(x+width-thickness, y+height/2,
        thickness, (height+1)/2, this.foregroundColor, true);
    }

    if(digit != 1 && digit != 4 && digit != 7){
      this.canvas.drawRectangle(x, y+height-thickness,
        width, thickness, this.foregroundColor, true);
    }

    if(digit ==2 || digit == 6 || digit == 8 || digit == 0){
      this.canvas.drawRectangle(x, y+height/2, thickness,
        (height+1)/2, this.foregroundColor, true);
    }

    if(digit != 1 && digit != 2 && digit != 3 && digit != 7){
      this.canvas.drawRectangle(x, y, thickness, (height+1)/2, this.foregroundColor, true);
    }

    if(digit != 1 && digit != 7 && digit != 0){
      this.canvas.drawRectangle(x, y + ((height - thickness)/2),
        width, thickness, this.foregroundColor, true);
    }
  }
}

WatchControl.propTypes = {
  clearColor: PropTypes.any,
  backgroundColor: PropTypes.any,
  foregroundColor: PropTypes.any,
  inverted: PropTypes.bool,
  showScreen: PropTypes.number,
  ...View.propTypes
};

WatchControl.defaultProps = ({
  clearColor:'black',
  backgroundColor: 'black',
  foregroundColor: 'white',
  inverted: false,
  showScreen: 0,
}:any);

module.exports = WatchControl;
