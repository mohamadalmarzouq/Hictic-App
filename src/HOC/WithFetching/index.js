// @flow

import React, {Component} from 'react';
import {View} from 'react-native';
import _ from 'lodash';
import {Loading} from '../../components';
import {Images} from '../../theme';

const WithFetching = (Child, isTransparent = true) =>
  class Fetching extends Component {
    state = {isFetching: false};

    shouldComponentUpdate(nextProps, nextState) {
      return (
        !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state)
      );
    }

    cbShowLoader = (isFetching, cb) =>
      (cb && this.setState({isFetching}, () => cb())) ||
      this.setState({isFetching});

    render() {
      return (
        <View style={{flex: 1, backgroundColor: 'transparent'}}>
          <Child {...this.props} cbShowLoader={this.cbShowLoader} />
          <Loading
            isTransparent={isTransparent}
            loading={this.state.isFetching}
            showNative={false}
            // json={Images.jsons.loader}
            image={Images.gifs.loader}
          />
        </View>
      );
    }
  };

export default WithFetching;
