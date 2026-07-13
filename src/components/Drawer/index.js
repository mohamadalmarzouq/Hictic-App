// @flow
import _ from 'lodash';
import React from 'react';
import {ScrollView} from 'react-native';
import {Text} from '../';
import styles from './styles';

export default class Drawer extends React.Component {
  render() {
    const {user} = this.props;

    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text>Hi</Text>
      </ScrollView>
    );
  }
}
