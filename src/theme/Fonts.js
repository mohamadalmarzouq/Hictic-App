// @flow
// Android
// title 20
// Heading 16
// desc 14

// ios
// title 20
// Heading 20
// desc 17

import {Platform} from 'react-native';
import Metrics from './Metrics';

const type = {
  base:
    Platform.OS === 'android'
      ? 'SF-Pro-Display-Regular'
      : 'SFProDisplay-Regular',
  bold: Platform.OS === 'android' ? 'SF-Pro-Display-Bold' : 'SFProDisplay-Bold',
  semiBold:
    Platform.OS === 'android'
      ? 'SF-Pro-Display-Semibold'
      : 'SFProDisplay-Semibold',
  light:
    Platform.OS === 'android' ? 'SF-Pro-Display-Light' : 'SFProDisplay-Light',
  medium:
    Platform.OS === 'android' ? 'SF-Pro-Display-Medium' : 'SFProDisplay-Medium',
  heavy:
    Platform.OS === 'android' ? 'SF-Pro-Display-Heavy' : 'SFProDisplay-Heavy',
  lightItalic:
    Platform.OS === 'android'
      ? 'SF-Pro-Display-LightItalic'
      : 'SFProDisplay-LightItalic',
};

// Metrics.generatedFontSize(ios, android)

const size = {
  xxxxxSmall: Metrics.generatedFontSize(10),
  xxxxSmall: Metrics.generatedFontSize(11),
  xxxSmall: Metrics.generatedFontSize(12),
  xxSmall: Metrics.generatedFontSize(13),
  xSmall: Metrics.generatedFontSize(14),
  small: Metrics.generatedFontSize(15),
  normal: Metrics.generatedFontSize(17),
  medium: Metrics.generatedFontSize(18),
  large: Metrics.generatedFontSize(20),
  mLarge: Metrics.generatedFontSize(22),
  xLarge: Metrics.generatedFontSize(24),
  xxLarge: Metrics.generatedFontSize(30),
  xxxLarge: Metrics.generatedFontSize(40),
};

export default {
  type,
  size,
};
