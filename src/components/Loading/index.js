// @flow

import React from 'react';
import {View, StatusBar, ActivityIndicator, Image} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import * as Progress from 'react-native-progress';

import styles from './styles';
import {Colors, Images, Metrics} from '../../theme';

export default class Loading extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    isTransparent: PropTypes.bool,
    backdropOpacity: PropTypes.number,
    loaderColor: PropTypes.string,
    showNative: PropTypes.bool,
    isModal: PropTypes.bool,
    image: PropTypes.any,
  };

  static defaultProps = {
    loading: false,
    isTransparent: false,
    backdropOpacity: 0.5,
    loaderColor: Colors.background.quaternary,
    showNative: true,
    isModal: true,
    image: undefined,
  };

  _renderProgress = () => {
    const {loaderColor, showNative} = this.props;

    if (showNative) {
      return <ActivityIndicator animating size="large" color={loaderColor} />;
    }

    return (
      <Progress.Circle
        color={loaderColor}
        borderWidth={3}
        indeterminate={true}
        endAngle={0.7}
        progress={1}
      />
    );
  };

  _renderImage = () => {
    return (
      <Image
        source={this.props.image}
        style={{width: Metrics.ratio(130)}}
        resizeMode="contain"
      />
    );
  };

  render() {
    const {loading, isTransparent, backdropOpacity, isModal, image, json} =
      this.props;

    if (isModal) {
      return (
        <Modal
          isVisible={loading}
          style={{
            margin: 0,
            alignItems: 'center',
          }}
          backdropOpacity={isTransparent ? 0 : backdropOpacity}
          useNativeDriver={false}>
          {!image && this._renderProgress()}
          {image && this._renderImage()}
        </Modal>
      );
    }

    if (loading) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.background.primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {!json && !image && this._renderProgress()}
          {image && this._renderImage()}
        </View>
      );
    }

    return null;
  }
}
