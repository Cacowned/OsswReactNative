/* @flow */
'use strict';

import React, {PropTypes } from 'react';
import {View, ListView, StyleSheet} from 'react-native';
import DeviceItem from './DeviceItem';

class DevicesList extends React.Component{
  state:{
    dataSource: ListView.DataSource;
  }
  constructor(props : Object){
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
    this.state = ({
      dataSource: ds.cloneWithRows(props.devices),
    } : any);
  }

  componentWillReceiveProps(nextProps : Object) {
    if(nextProps.devices !== this.props.devices){
      this.setState(({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.devices),
      }:any));
    }
  }

  render(){
    return(
      <ListView
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={
          (data) => <DeviceItem
                      device={data}
                      onDeviceSelected={() => this.props.onDeviceSelected(data)}/>
        }/>
    );
  }
}

DevicesList.propTypes = {
  devices: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeviceSelected: PropTypes.func.isRequired,
}

export default DevicesList;
