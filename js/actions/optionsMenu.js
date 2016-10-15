/* @flow */
'use strict';

import type { Action, ThunkAction } from './types';

export const CREATE_OPTIONS_MENU = 'CREATE_OPTIONS_MENU';

export const createOptionsMenu = (options: Object[]) : Action => ({
  type: CREATE_OPTIONS_MENU,
  options,
}:any);
