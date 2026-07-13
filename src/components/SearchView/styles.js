// @flow
import {StyleSheet} from 'react-native';
import {Metrics, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    height: Metrics.ratio(48),
    paddingRight: Metrics.ratio(16),
    borderRadius: Metrics.ratio(10),
  },
  searchTextFieldStyle: {
    flex: 1,
    padding: 0,
    paddingLeft: Metrics.ratio(16),
    paddingVertical: Metrics.ratio(16),
    marginRight: Metrics.smallMargin,
    fontSize: Fonts.size.xSmall,
    fontFamily: Fonts.type.base,
  },
});
