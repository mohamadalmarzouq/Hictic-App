// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  TextInput,
  ActivityIndicator,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import {ButtonView} from '../';
import styles from './styles';
import {Colors, Images, Metrics} from '../../theme';

export default class SearchView extends React.PureComponent {
  static propTypes = {isSearch: PropTypes.bool, onPress: PropTypes.func};

  static defaultProps = {isSearch: false, onPress: undefined};

  render() {
    const {isSearch, onPress, ...reset} = this.props;
    const Container = onPress === undefined ? View : ButtonView;
    return (
      <Container
        onPress={onPress}
        style={{marginHorizontal: Metrics.ratio(20)}}>
        <View
          style={styles.container}
          pointerEvents={onPress === undefined ? 'auto' : 'box-only'}>
          <TextInput
            editable={onPress === undefined}
            placeholder={'Search...'}
            selectionColor={Colors.text.selectionColor}
            placeholderTextColor={Colors.text.quaternary}
            underlineColorAndroid={Colors.transparent}
            style={styles.searchTextFieldStyle}
            keyboardType={
              Platform.OS === 'android' ? 'email-address' : 'ascii-capable' // disable emojis from keypad
            }
            {...reset}
          />
          {!isSearch && <Image source={Images.search} />}
          {isSearch && (
            <ActivityIndicator
              size="small"
              color={Colors.quaternary}
              animating
            />
          )}
        </View>
      </Container>
    );
  }
}
