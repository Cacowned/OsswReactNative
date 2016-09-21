/* @flow */
'use strict';

import type { Action } from './types';

module.exports = {
  selectDevice: (device: Object): Action => ({
    type: 'SELECT_DEVICE',
    device,
  }),
};
