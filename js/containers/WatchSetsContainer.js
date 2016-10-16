/* @flow */

'use strict';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import WatchSetsList from '../components/watchsets/WatchSetsList';
import { getAllWatchSets } from '../reducers/watchsets';
import {
  selectWatchset,
  createOptionsMenu,
  importWatchSet,
  deleteSelectedWatchSet,
} from '../actions';

class WatchSetsContainer extends React.Component {

  createOptionsMenu(watchsets){


    var optionsMenu = [{
      title: "Import",
      action: ()=>{
        this.props.onImportWatchSet();
      }
    }];
    var selectedCount = watchsets.filter((item)=>item.isSelected).length;
    if(selectedCount > 0){
      optionsMenu.push({
        title: "Delete",
        action: ()=>{
          this.props.onDeleteSelectedWatchSet();
        }
      });
    }

    if(selectedCount == 1){
      optionsMenu.push({
        title: "Preview",
        action: () => {}
      });
      optionsMenu.push({
        title:"Upload",
        action: () => {}
      });
    }

    this.props.setOptionsMenu(optionsMenu);
  }

  componentDidMount(){
    this.createOptionsMenu(this.props.watchsets);
  }

  componentWillReceiveProps(nextProps: Object){
    if(nextProps.watchsets !== this.props.watchsets){
      this.createOptionsMenu(nextProps.watchsets);
    }
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
    onImportWatchSet: ()=>{
      dispatch(importWatchSet());
    },
    onDeleteSelectedWatchSet: () => {
      dispatch(deleteSelectedWatchSet());
    }
  }
);

export default connect(mapStateToProps,mapDispatchToProps)(WatchSetsContainer);
