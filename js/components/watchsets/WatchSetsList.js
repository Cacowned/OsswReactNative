/* @flow */

'use strict';

import React, { PropTypes } from 'react';
import { View, ListView, StyleSheet } from 'react-native';
import WatchSetItem from './WatchSetItem';


class WatchSetsList extends React.Component {
  constructor(props: Object){
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
    this.state = ({
      dataSource: ds.cloneWithRows(props.watchsets),
    }:any);
  }

  componentWillReceiveProps(nextProps: Object){
    if(nextProps.watchsets !== this.props.watchsets){
      this.setState(({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.watchsets),
      }:any));
    }
  }

  render(){
    return (
      <ListView
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={
          (data) => <WatchSetItem
                      watchset={data}
                      onWatchSetSelected={()=>{
                        this.props.onWatchSetSelected(data);
                      }}/>
        }/>
    );
  }
}

WatchSetsList.propTypes = {
  watchsets: PropTypes.arrayOf(PropTypes.object).isRequired,
  onWatchSetSelected: PropTypes.func.isRequired,
}

export default WatchSetsList;
