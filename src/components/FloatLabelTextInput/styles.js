// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  inputStyle: {
    color: Colors.text.secondary,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium,
  },
  floatingStyle: {
    color: Colors.text.secondary,
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.xxSmall,
    marginTop: Metrics.smallMargin * 0.5,
  },
  inputContainer: {
    height: Metrics.ratio(60),
    backgroundColor: Colors.background.tertiary,
    paddingVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.smallMargin,
    // marginVertical: Metrics.inputSpacing,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: Colors.borders.primary,
    borderRadius: Metrics.borderRadius,
    marginBottom: Metrics.ratio(10),
  },
  rightText: {
    paddingHorizontal:
      Platform.OS === 'ios' ? Metrics.smallMargin * 0.6 : Metrics.smallMargin,
    paddingVertical: Metrics.smallMargin * 1.2,
  },
  rightImage: {
    marginHorizontal: Metrics.smallMargin,
  },
  eyeIcon: {
    width: Metrics.ratio(30),
    height: Metrics.ratio(30),
    resizeMode: 'contain',
  },
});
