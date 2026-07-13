import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import {ButtonView} from '../';
import {ApplicationStyles, Metrics} from '../../theme';

const styles = {
  container: {
    paddingVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.baseMargin * 1.25,
  },
};

export default class HeaderButton extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    style: PropTypes.object,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    text: 'Right',
    onPress: () => alert("Pass 'onPress' prop"),
    style: {},
    disabled: false,
  };

  render() {
    const {text, onPress, style, disabled} = this.props;
    return (
      <ButtonView
        style={[styles.container, style]}
        onPress={onPress}
        disabled={disabled}>
        <Text style={ApplicationStyles.re17Primary}>{text}</Text>
      </ButtonView>
    );
  }
}
