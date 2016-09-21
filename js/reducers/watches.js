/* @flow */
'use strict';

import type {Action} from '../actions/types';

type State = {
  device: Object;
}

const initialState: State = {device: undefined,};

function watches(state: State = initialState, action: Action): State {
  if(action.type === 'SELECT_DEVICE'){
    return {...state, device: action.device};
  }

  return state;
}

module.exports = watches;
