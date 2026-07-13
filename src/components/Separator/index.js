// @flow
import React from 'react';
import {View, PropT} from 'react-native';
import styles from './styles';

export default class Separator extends React.PureComponent {
  static propTypes = {
    style: PropT,
  };

  static defaultProps = {
    style: {},
  };

  render() {
    const {style} = this.props;
    return <View style={[styles.container, style]} />;
  }
}
