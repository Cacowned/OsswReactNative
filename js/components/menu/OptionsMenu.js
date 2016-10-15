/* @flow */
'use strict';

import React, { PropTypes } from 'react';
import { View, StyleSheet} from 'react-native';
import OptionsMenuItem from './OptionsMenuItem';
import { connect } from 'react-redux';

class OptionsMenu extends React.Component {
  constructor(props: Object) {
    super(props);
  }

  render (){
    var children = this.props.menuOptions.reduce((obj, item)=>{
      obj.push((
        <OptionsMenuItem menuItem={item} key={item.title}/>
      ));
      return obj;
    }, []);

    return (
      <View style={styles.container}>
        {children}
      </View>
    );
  }
}

OptionsMenu.propTypes = {
  menuOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const styles = StyleSheet.create({
  container:{
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) =>(
  {
    menuOptions: state.optionsMenu.optionsMenu,
  }
);

export default connect(mapStateToProps)(OptionsMenu);
