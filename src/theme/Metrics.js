/*
 * @flow
 * TODO: value * ratio difference between Android and iOS is of 2 value;
 * 16 in iOS is equals to 14 in android but this need to be verify.
 */

import {
  Dimensions,
  Platform,
  StyleSheet,
  StatusBar,
  PixelRatio,
} from 'react-native';
import {Metrics} from '.';
import {isIphoneX, getStatusBarHeight} from 'react-native-iphone-screen-helper';

const {width, height} = Dimensions.get('window');

const screenWidth = width < height ? width : height;
const screenHeight = width < height ? height : width;

const guidelineBaseWidth = 414;
const guidelineBaseHeight = 736;

const scale = size => (screenWidth / guidelineBaseWidth) * +size;
const scaleVertical = size => (screenHeight / guidelineBaseHeight) * size;

const isXXHDPIDevice = PixelRatio.get() === 3;

// android guideline
const guidelineBaseWidthAndroid = 640;
const guidelineBaseHeightAndroid = 800;

const scaleAndroid = size => (screenWidth / guidelineBaseWidthAndroid) * +size;
const scaleVerticalAndroid = size =>
  (screenHeight / guidelineBaseHeightAndroid) * size;

const ratio = (iosSize: number, androidSize: ?number) =>
  Platform.select({
    ios: iosSize, // scaleVertical(iosSize),
    //android: scaleVerticalAndroid(androidSize || iosSize)
    android: androidSize || iosSize,
  });

const generatedFontSize = (iosFontSize: number, androidFontSize: ?number) =>
  Platform.select({
    ios: iosFontSize, // scale(iosFontSize),
    //android: scaleAndroid(androidFontSize || iosFontSize)
    android: androidFontSize || iosFontSize,
  });

const NAVBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : StatusBar.currentHeight;

const notebookLeftMargin = ratio(38);
const notebookLineSpacing = ratio(30);
const notebookNavHeaderHeight = ratio(85);
const progressBarHeight = notebookLineSpacing - ratio(14);

const tabDividerHeight = ratio(4);
const tabDividerWidth = ratio(44);
const bottomSpaceIphoneX = 20;

const bottomPadding= isIphoneX() ? bottomSpaceIphoneX : ratio(0);

export default {
  ratio,
  screenWidth,
  screenHeight,
  halfScreenWidth: screenWidth / 2,
  halfScreenHeight: screenHeight / 2,
  generatedFontSize,
  smallMargin: ratio(8),
  inputSpacing: ratio(5.6),
  baseMargin: ratio(16),
  mediumMargin: ratio(24),
  doubleBaseMargin: ratio(32),
  statusBarHeight: STATUSBAR_HEIGHT,
  horizontalLineHeight: StyleSheet.hairlineWidth,
  navBarHeight: NAVBAR_HEIGHT + STATUSBAR_HEIGHT,
  navBarHeightWithoutStatusBar: NAVBAR_HEIGHT,
  tabBarHeight: 49, // Default tab bar height in iOS 10 (source react-navigation)
  borderRadius: ratio(5),
  defaultUIHeight: ratio(44),
  icon: {
    tiny: ratio(8),
    small: ratio(16),
    normal: ratio(24), // Default tab icon size (source react-navigation)
    medium: ratio(32),
    large: ratio(40),
    xLarge: ratio(50),
    xxLarge: ratio(60),
    xxxLarge: ratio(100),
  },
  image: {
    small: ratio(20),
    medium: ratio(40),
    large: ratio(60),
    coverWidth: screenWidth,
    coverHeight: screenWidth / 2,
  },
  notebookLeftMargin,
  notebookLineSpacing,
  notebookNavHeaderHeight,
  progressBarHeight,
  profileHeight: ratio(120),

  isXXHDPIDevice,
  tabDividerHeight,
  tabDividerWidth,
  bottomPadding
};
