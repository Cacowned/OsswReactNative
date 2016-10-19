/* @flow */

'use strict';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import WatchSetsList from '../components/watchsets/WatchSetsList';
import WatchSetPreview from '../components/watchsets/WatchSetPreview';
import { getAllWatchSets } from '../reducers/watchsets';
import {
  selectWatchset,
  importWatchSet,
  deleteSelectedWatchSet,
} from '../actions';

class WatchSetsContainer extends React.Component {

  constructor(props){
    super(props);

    this.state = ({
      preview: undefined,
    }:any);
  }

  createOptionsMenu(watchsets){
    var optionsMenu = [{
      title: "Import",
      action: ()=>{
        this.props.onImportWatchSet();
      }
    }];
    var selectedWatchSets = watchsets.filter((item)=>item.isSelected);

    if(selectedWatchSets.length > 0){
      optionsMenu.push({
        title: "Delete",
        action: ()=>{
          this.props.onDeleteSelectedWatchSet();
        }
      });
    }

    if(selectedWatchSets.length == 1){
      var selectedWatchSet = selectedWatchSets[0];
      optionsMenu.push({
        title: "Preview",
        action: () => {
          this.setState({preview: selectedWatchSet});
        }
      });
      optionsMenu.push({
        title:"Upload",
        action: () => {}
      });
    }

    this.context.setOptions(optionsMenu);
  }

  componentDidMount(){
    this.createOptionsMenu(this.props.watchsets);
  }

  componentWillUnmount(){
    this.context.setOptions([]);
  }

  componentWillReceiveProps(nextProps: Object){
    if(nextProps.watchsets !== this.props.watchsets){
      this.createOptionsMenu(nextProps.watchsets);
    }
  }

  render() {
    if(this.state.preview){
      return <WatchSetPreview size={500} watchSet={this.state.preview}/>
    }
    else {
      return (
        <WatchSetsList
          watchsets={this.props.watchsets}
          onWatchSetSelected={(watchset) => this.props.onWatchSetSelected(watchset)} />
      );
    }
  }
}

WatchSetsContainer.contextTypes = {
    setOptions: React.PropTypes.func,
};

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
