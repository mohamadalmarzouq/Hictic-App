// @flow
import {StyleSheet, Platform} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  inputStyle: {
    color: Colors.text.secondary,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.normal,
  },
  floatingStyle: {
    color: Colors.text.secondary,
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.xxSmall,
    left: Platform.OS === 'ios' ? -4 : 0,
    marginTop: Platform.OS === 'ios' ? -8 : 2,
  },
  inputContainer: {
    backgroundColor: Colors.background.tertiary,
    paddingTop:
      Platform.OS === 'ios' ? Metrics.baseMargin : Metrics.smallMargin,
    paddingBottom:
      Platform.OS === 'ios' ? Metrics.baseMargin : Metrics.smallMargin,
    paddingHorizontal: Metrics.smallMargin * 2 - 6,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: Colors.borders.primary,
    borderRadius: Metrics.borderRadius,
    marginBottom: Metrics.ratio(10),
  },
  rightText: {
    paddingHorizontal: Metrics.smallMargin,
    paddingVertical: Metrics.smallMargin * 1.2,
  },
  rightImage: {
    marginHorizontal: Metrics.smallMargin,
  },
});
