// @flow
import React from 'react';
import {View, Text} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {ButtonView} from '../';
import {Strings, Fonts, Colors, ApplicationStyles, Metrics} from '../../theme';
import styles from './styles';

export default class TextInput extends React.PureComponent {
  static defaultProps = {
    lineWidth: 0,
    title: ' ',
    activeLineWidth: 0,
    style: styles.input,
    fontSize: Fonts.size.normal,
    labelTextStyle: styles.label,
    tintColor: Colors.text.secondary,
    baseColor: Colors.text.secondary,
    labelFontSize: Fonts.size.xxSmall,
    isForgot: false,
    onForgotPress: () => {},
  };

  blur() {
    this.input.blur();
  }

  clear() {
    this.input.clear();
  }

  focus() {
    this.input.focus();
  }

  isFocused() {
    return this.input.isFocused();
  }

  isRestricted() {
    return this.input.isRestricted();
  }

  value() {
    return this.input.value();
  }

  render() {
    const {isForgot, onForgotPress, ...reset} = this.props;

    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: Colors.background.tertiary,
          borderRadius: Metrics.borderRadius,
          marginBottom: Metrics.ratio(10),
          //  paddingVertical: Metrics.ratio(10),
          paddingHorizontal: Metrics.ratio(16),
        }}>
        <View style={{flex: 1}}>
          <TextField
            // labelHeight={16}
            // inputContainerPadding={0}
            // containerStyle={{ height: Metrics.ratio(40) }}
            ref={ref => {
              this.input = ref;
            }}
            {...reset}
          />
        </View>
        {isForgot && (
          <View style={{justifyContent: 'flex-end'}}>
            <ButtonView style={{marginBottom: 2}} onPress={onForgotPress}>
              <Text style={ApplicationStyles.li12Secondary}>
                {Strings.button_forgot}
              </Text>
            </ButtonView>
          </View>
        )}
      </View>
    );
  }
}
