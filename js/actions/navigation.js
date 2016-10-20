/* @flow */
'use strict';

import type { Action, ThunkAction } from './types';

import type { Tab } from '../reducers/navigation';

module.exports = {
  switchTab: (tab: Tab): ThunkAction => (dispatch, getState) => {
    dispatch({
      type: 'SWITCH_TAB',
      tab,
    });
  }
};
