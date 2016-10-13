/* @flow */
'use strict';

import React, {PropTypes} from 'react';
// import { createDevTools } from 'redux-devtools';
// import LogMonitor from 'redux-devtools-log-monitor';
// import DockMonitor from '../components/dev/DockMonitor';

// export default createDevTools(
//   <DockMonitor toggleVisibilityKey="ctrl-h"
//                changePositionKey="ctrl-w">
//       {/* <LogMonitor/> */}
//   </DockMonitor>
// );

import { requireNativeComponent, View } from 'react-native';

class DevToolsContainer extends React.Component{
  render(){
    return (
      <DockMonitor {...this.props} toggleVisibilityKey="ctrl-h"/>
    );
  }
}

DevToolsContainer.propTypes = {
  toggleVisibilityKey: PropTypes.string,
  changePositionKey: PropTypes.string,
  ...View.propTypes
};

var DockMonitor = requireNativeComponent('RCTDockMonitor', DevToolsContainer);

export default DevToolsContainer;
