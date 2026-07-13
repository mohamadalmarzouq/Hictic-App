// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, ActivityIndicator} from 'react-native';

import styles from './styles';
import {Colors} from '../../theme';

export default class Progress extends React.PureComponent {
  static propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['small', 'large']),
    ]),
    style: PropTypes.any,
  };

  static defaultProps = {
    size: 'small',
    style: styles.container,
    color: Colors.background.quaternary,
  };

  render() {
    const {style, ...reset} = this.props;

    return (
      <View style={style}>
        <ActivityIndicator animating {...reset} />
      </View>
    );
  }
}
