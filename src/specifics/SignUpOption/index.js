import React from 'react';
import {View, Text} from 'react-native';
import {ApplicationStyles, Metrics, Strings} from '../../theme';

export default class SignUpOption extends React.PureComponent {
  render() {
    const {onPress, isSecondary, showLogin} = this.props;
    return (
      <View
        style={{
          marginBottom: Metrics.doubleBaseMargin,
          marginTop: Metrics.baseMargin,
        }}>
        <Text
          style={[
            isSecondary
              ? ApplicationStyles.re17Secondary
              : ApplicationStyles.re17Primary,
            {alignSelf: 'center'},
          ]}>
          {showLogin ? Strings.have_account : Strings.have_not_account}
          <Text
            onPress={onPress}
            style={[
              isSecondary
                ? ApplicationStyles.b17Secondary
                : ApplicationStyles.b17Primary,
            ]}>
            {' '}
            {showLogin ? Strings.sign_in : Strings.sign_up}
          </Text>
        </Text>
      </View>
    );
  }
}
