/* @flow */

'use strict';

import { connect } from 'react-redux';
import Main from '../Main';
import { startScanning, stopScanning, importWatchSet } from '../actions';

const mapStateToProps = (state) => (
  {
    activeDevice: state.devices.activeDevice,
    activeTab: state.navigation.tab,
    isScanning: state.devices.isScanning,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    startScanning: () => {
      dispatch(startScanning());
    },
    stopScanning: () => {
      dispatch(stopScanning());
    },
    onImportWatchSet: () => {
      dispatch(importWatchSet());
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
