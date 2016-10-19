/* @flow */
'use strict';

import getImageData from './ImageDataHelper';

class ImageControlRenderer{
  imageControl:Object;
  imageData:number[];
  constructor(control:Object, resources:Object){
    this.imageControl = control;
    this.imageData = this._getImageData(resources)
  }

  render(canvas:Object){
    const {position, style } = this.imageControl;
    canvas.drawImage(this.imageData ,position.x, position.y, style.width, style.height);
  }

  _getImageData(resources){
    return getImageData(this.imageControl.image.id, resources);
  }
}

export default ImageControlRenderer;
