// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, Text} from 'react-native';
import {GradientButtonBorder} from '../';
import {
  ERROR_SOMETHING_WENT_WRONG,
  ERROR_NETWORK_NOT_AVAILABLE,
} from '../../config/WebService';
import {Images, ApplicationStyles} from '../../theme';
import styles from './styles';

export default class EmptyView extends React.PureComponent {
  static propTypes = {
    image: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    onPress: PropTypes.func,
    buttonText: PropTypes.string,
    errorMessage: PropTypes.string,
    style: PropTypes.any,
    buttonStyle: PropTypes.any,
    bottomStyle: PropTypes.any,
  };

  static defaultProps = {
    image: Images.login_bg,
    title: 'OOPS!',
    description: 'No description',
    onPress: undefined,
    buttonText: 'RETRY',
    errorMessage: '',
    style: {},
    buttonStyle: {},
    bottomStyle: {},
  };

  _getImage() {
    const {image, errorMessage} = this.props;
    if (errorMessage === ERROR_SOMETHING_WENT_WRONG.message) {
      return Images.emptyImages.error;
    } else if (errorMessage === ERROR_NETWORK_NOT_AVAILABLE.message) {
      return Images.emptyImages.error;
    }
    return image;
  }

  _getTitle() {
    const {title, errorMessage} = this.props;
    if (errorMessage === ERROR_SOMETHING_WENT_WRONG.message) {
      return 'OOPS!';
    } else if (errorMessage === ERROR_NETWORK_NOT_AVAILABLE.message) {
      return 'Oh no!';
    } else if (errorMessage !== '') {
      return 'OOPS!';
    }
    return title;
  }

  _getDescription() {
    const {description, errorMessage} = this.props;
    if (errorMessage === ERROR_SOMETHING_WENT_WRONG.message) {
      return 'Something went wrong while we were loading data. Check your connection or try again.';
    } else if (errorMessage === ERROR_NETWORK_NOT_AVAILABLE.message) {
      return 'No internet found. Check your connection or try again.';
    } else if (errorMessage !== '') {
      return errorMessage;
    }
    return description;
  }

  render() {
    const {onPress, buttonText, style, buttonStyle, bottomStyle} = this.props;

    return (
      <View style={[styles.container, style]}>
        <Image
          source={this._getImage()}
          style={styles.image}
          resizeMethod="resize"
        />
        <View style={bottomStyle}>
          <Text style={[ApplicationStyles.b20Secondary, styles.title]}>
            {this._getTitle()}
          </Text>
          <Text style={[ApplicationStyles.re17Secondary, styles.text]}>
            {this._getDescription()}
          </Text>
          {!_.isUndefined(onPress) && (
            <GradientButtonBorder
              style={[styles.button, buttonStyle]}
              onPress={onPress}
              title={buttonText}
            />
          )}
        </View>
      </View>
    );
  }
}
