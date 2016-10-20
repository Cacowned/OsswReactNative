'use strict';

import AppContainer from './AppContainer';
import Root from './Root';
import WatchSetsContainer from './WatchSetsContainer';
// import OptionsMenuContext from './OptionsMenuContext';
import DevicesContainer from './DevicesContainer';

var Containers = {
  AppContainer: AppContainer,
  DevicesContainer,
  get OptionsMenuContext() {return require('./OptionsMenuContext');},
  WatchSetsContainer,
  Root,
};


module.exports = Containers;
