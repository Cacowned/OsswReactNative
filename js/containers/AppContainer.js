/* @flow */

'use strict';

import { connect } from 'react-redux';
import Main from '../Main';
import { startScanning, stopScanning } from '../actions';

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
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
