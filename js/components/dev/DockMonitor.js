import { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

var iface = {
  name: 'DockMonitor',
  propTypes: {
    toggleVisibilityKey: PropTypes.string,
    changePositionKey: PropTypes.string,
    ...View.propTypes
  },
};

module.exports = requireNativeComponent('RCTDockMonitor', iface);
