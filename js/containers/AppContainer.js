/* @flow */

'use strict';

import { connect } from 'react-redux';
import Main from '../Main';
import { startScanning, stopScanning } from '../actions';

const mapStateToProps = (state) => (
  {
    activeDevice: state.devices.activeDevice,
    activeTab: state.navigation.tab,
  }
);

export default connect(mapStateToProps)(Main);
