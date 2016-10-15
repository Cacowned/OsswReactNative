/* @flow */

'use strict';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import WatchSetsList from '../components/watchsets/WatchSetsList';
import { getAllWatchSets } from '../reducers/watchsets';
import { selectWatchset, createOptionsMenu, importWatchSet } from '../actions';

class WatchSetsContainer extends React.Component {

  componentDidMount(){
    this.props.createOptionsMenu([{
      title: "Import",
      action: ()=>{
        this.props.onImportWatchSet();
      }
    }]);
  }
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
    createOptionsMenu: (options)=>{
      dispatch(createOptionsMenu(options));
    },
    onImportWatchSet: ()=>{
      dispatch(importWatchSet());
    },
  }
);

export default connect(mapStateToProps,mapDispatchToProps)(WatchSetsContainer);
