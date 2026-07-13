// @flow
import {StyleSheet, Platform} from 'react-native';
import {Fonts, Metrics, Colors} from '../theme';
import {isIphoneX} from 'react-native-iphone-screen-helper';

export default StyleSheet.create({
  cardStyle: {
    backgroundColor: Colors.background.primary,
  },
  header: {
    elevation: 0,
    borderBottomWidth: 0,
    shadowColor: Colors.transparent,
    backgroundColor: Colors.navbar.background,
  },
  headerRaised: {
    elevation: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1.0,
    shadowOpacity: 0.18,
    shadowColor: Colors.black,
    backgroundColor: Colors.navbar.background,
  },
  title: {
    // TODO: To center title on android add bellow styles
    // paddingHorizontal: Platform.OS === "ios" ? 70 : 56,
    // textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    marginHorizontal: 0,
    fontSize: Fonts.size.mLarge,
    fontFamily: Fonts.type.bold,
    color: Colors.navbar.text,
  },
  titleCenter: {
    // position: 'absolute',
    // left: 0,
    // right: 0,
    marginHorizontal: 0,
    fontSize: Fonts.size.mLarge,
    fontFamily: Fonts.type.bold,
    color: Colors.navbar.text,
    alignSelf: 'center',
  },
  rightButtonStyle: {
    marginRight: Metrics.smallMargin,
  },
  rightTextStyle: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.type.bold,
    color: Colors.navbar.text,
    fontWeight: 'normal',
    marginLeft: Metrics.smallMargin,
    marginRight: Metrics.ratio(6),
  },
  tabBarStyle: {
    backgroundColor: Colors.background.quaternary,
    paddingBottom: Metrics.bottomPadding,
    // height: Platform.OS === 'ios' && isIphoneX() ? 65 : undefined,
    height: Platform.OS === 'ios' && isIphoneX() ? 65 : 65,
  },
});
