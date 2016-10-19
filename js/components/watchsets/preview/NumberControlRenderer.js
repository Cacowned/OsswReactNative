/* @flow */
'use strict';
import getImageData from './ImageDataHelper';

const NUMBER_RANGE_0__19 = 0x20;
const NUMBER_RANGE_0__99 = 0x30;
const NUMBER_RANGE_0__999 = 0x50;

function renderGeneratedDigit(digitWidth, digitHeight, thickness){
  return function(canvas, digit, x, y, fullWidth, drawZero){
    if(!fullWidth && digit == 1){
      canvas.drawRectangle(x, y, thickness, digitHeight, true);
      return thickness;
    }
    if(drawZero || digit != 0){
      canvas.drawDigit(digit, x, y, digitWidth, digitHeight, thickness);
    }
    return digitWidth;
  }
}

function renderNumberFontDigit(imageData:Object){

  return function(canvas, digit, x, y, fullWidth, drawZero){
    var digitWidth = imageData[2];
    var digitHeight = imageData[3];
    var idx = 4 + (Math.floor((digitWidth + 7)/8)*digitHeight * digit);
    canvas.drawBitmap(imageData, idx, x, y,
      digitWidth, digitHeight, digitWidth);

    return digitWidth;
  };
}

function renderDecimalSeparator(digitWidth, digitHeight, thickness){
  return function(canvas, x, y){
    canvas.drawRectangle(x, y + digitHeight - thickness, thickness,
      thickness,'white', true);
    return thickness;
  }
}

class NumberControlRenderer {
  numberControl:Object;
  resources:Object;
  _renderDigit:Function;
  _renderDecimalSeparator:Function;

  constructor(control:Object, resources:Object){
    this.numberControl = control;
    this.resources = resources;

    const { style }= control;

    if(style.type === 'generated'){
      this._renderDigit = renderGeneratedDigit(style.width,
          style.height, style.thickness);
      this._renderDecimalSeparator =
          renderDecimalSeparator(style.width, style.height, style.thickness);
    }else{
      this._renderDigit = renderNumberFontDigit(this._getImageData());
      this._renderDecimalSeparator = (c,x,y) => 0;
    }
  }

  render(canvas:Object, value:number){
    var range = this._getRange();
    var decimalSize = range & 0xF;
    var digitNo = Math.floor((range >> 4) / 2 + 1 +decimalSize);
    var is_1XFormat = (range >> 4) % 2 == 0;

    const { position, style } = this.numberControl;
    if(is_1XFormat){
      this._drawOneStartingIntDigits(canvas,
        this._clamp(value, 0, Math.floor(2*Math.pow(10, digitNo -1)-1)),
        digitNo, decimalSize, position.x, position.y, style.space);
    }else{
      this._drawIntDigits(canvas,
        this._clamp(value, 0, Math.floor(Math.pow(10, digitNo)-1)),
        digitNo, decimalSize, position.x, position.y,
        style.space, style.leftPadded);
    }
  }

  _drawOneStartingIntDigits(canvas:Object, value:number, digitsNo:number,
     decimalSize:number, x:number, y:number, digitSpace:number){
    var div = Math.floor(Math.pow(10, digitsNo-1));
    if(value > div){
      x += this._renderDigit(canvas, 1, x, y, false, false) + digitSpace;
    }
    this._drawIntDigits(canvas, value, digitsNo-1, decimalSize,
      x, y, digitSpace, false)
  }

  _drawIntDigits(canvas:Object, value:number, digitsNo:number,
     decimalSize:number, x:number, y:number, digitSpace:number,
     leftPadded:boolean){
    var currentX = x;
    var div = Math.floor(Math.pow(10, digitsNo-1));
    for(var i = 0; i < digitsNo; i++){
      if(decimalSize >0 && decimalSize - i ==decimalSize){
        currentX += this._renderDecimalSeparator(canvas, x, y) + digitSpace;
      }
      var scaledValue = Math.floor(value/div);
      var digit = scaledValue%10;
      var drawZeroValue = leftPadded || (digitsNo - i - 1 <= decimalSize);

      currentX += this._renderDigit(canvas, digit, currentX, y, true,
          scaledValue>0 || drawZeroValue || div == 1) + digitSpace;
      div = div / 10;
    }
  }

  _clamp(value:number, min:number, max:number){
    return Math.max(min, Math.min(value, max));
  }

  _getRange(){
    switch(this.numberControl.numberRange){
      case '0-19':
        return NUMBER_RANGE_0__19;
      case '0-99':
        return NUMBER_RANGE_0__99;
      default:
        return NUMBER_RANGE_0__999
    }
  }

  _getImageData(){
    const { style } = this.numberControl;
    return getImageData(style.numbersFont.id, this.resources);
  }
}

export default NumberControlRenderer;
