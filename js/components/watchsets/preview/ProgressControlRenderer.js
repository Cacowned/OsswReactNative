/* @flow */
'use strict';

class ProgressControlRenderer{
  progressControl:Object;

  constructor(control:Object){
    this.progressControl = control;
  }

  render(canvas:Object, value:number){
    var percentage = value/this.progressControl.maxValue;
    if(percentage>1)percentage=1;

    const {size, position, style}=this.progressControl;

    var width = Math.floor(percentage*size.width);
    var height = size.height;
    var x = position.x;
    var y = position.y;

    if(style.border > 0){
      canvas.drawRectangle(x,y,size.width, size.height, false);
      height -= style.border*2;
      width -= style.border*2;

      x+= style.border;
      y+= style.border;
    }
    canvas.drawRectangle(x, y, width, height, true);
  }
}

export default ProgressControlRenderer;
