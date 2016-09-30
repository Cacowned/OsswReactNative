/* @flow */

'use strict';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import WatchSetsList from '../components/watchsets/WatchSetsList';


class WatchSetsContainer extends React.Component {

  watchsetselected(watchset){

  }

  render() {
    return (
      <WatchSetsList
        watchsets={[]}
        onWatchSetSelected={(watchset) => this.watchsetselected(watchset)} />
    );
  }
}

export default connect()(WatchSetsContainer);
