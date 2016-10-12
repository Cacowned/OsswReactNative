/* @flow */
'use strict';

type Control = {
  type: 'number' | 'text' | 'progress' | 'image' | 'imageFromSet';
  position: {x: number, y: number};
  style: Object;
  image: Object;
}

type Screen = {
  id: string;
  controls: Control[];
}

type WatchSetData = {
  screens: Screen[];
}

export type WatchSet = {
  name: string;
  type: 'fae';
  apiVersion: number;
  data: WatchSetData;
}
