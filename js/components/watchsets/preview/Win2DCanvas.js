/* @flow */
'use strict';

import React, { PropTypes } from 'react';
import ReactNative, {
  requireNativeComponent,
  View,
  UIManager,
} from 'react-native';
const processColor = require('processColor');

var RK_PANE_REF = 'paneView';

class Win2DCanvas extends React.Component{
  render(){
    return(
      <RCTWin2DCanvas
        {...this.props}
        clearColor={processColor(this.props.clearColor)}
        ref={RK_PANE_REF} />
    );
  }

  invalidate(){
    UIManager.dispatchViewManagerCommand(this._getPaneLayoutHandle(),
      UIManager.RCTWin2DCanvas.Commands.invalidate,
      null
    );
  }

  drawLine(x0:number, y0:number, x1:number, y1:number, color:string){
    UIManager.dispatchViewManagerCommand(this._getPaneLayoutHandle(),
      UIManager.RCTWin2DCanvas.Commands.drawLine,
      [x0,y0,x1,y1,processColor(color)]
    );
  }

  drawRectangle(x:number, y:number, width:number, height:number,
                color:string, fill:boolean=false){
    UIManager.dispatchViewManagerCommand(this._getPaneLayoutHandle(),
      UIManager.RCTWin2DCanvas.Commands.drawRectangle,
      [x,y,width,height,processColor(color), fill]
    );
  }

  _getPaneLayoutHandle() {
    return ReactNative.findNodeHandle(this.refs[RK_PANE_REF]);
  }
}

Win2DCanvas.propTypes = {
  clearColor: PropTypes.any,
  ...View.propTypes
};

var RCTWin2DCanvas = requireNativeComponent('RCTWin2DCanvas', Win2DCanvas);

module.exports = Win2DCanvas;
