/* @flow */

'use strict';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import WatchSetsList from '../components/watchsets/WatchSetsList';
import { getAllWatchSets } from '../reducers/watchsets';
import { selectWatchset } from '../actions/watchsets';

class WatchSetsContainer extends React.Component {

  render() {
    return (
      <WatchSetsList
        watchsets={this.props.watchsets}
        onWatchSetSelected={(watchset) => this.props.onWatchSetSelected(watchset)} />
    );
  }
}

const mapStateToProps = (state) => (
  {
    watchsets: getAllWatchSets(state.watchsets),
  }
);

const mapDispatchToProps = dispatch => (
  {
    onWatchSetSelected: (watchset) => {
      dispatch(selectWatchset(watchset));
    },
  }
);

export default connect(mapStateToProps,mapDispatchToProps)(WatchSetsContainer);
