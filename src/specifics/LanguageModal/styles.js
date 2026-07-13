// @flow
import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  body: {
    paddingTop: Metrics.ratio(24),
    paddingHorizontal: Metrics.ratio(16),
    borderRadius: Metrics.ratio(10),
    backgroundColor: Colors.background.primary,
  },
  crossIcon: {
    padding: Metrics.ratio(12),
    position: 'absolute',
    right: 0,
  },
  titleStyle: {
    textAlign: 'center',
    marginHorizontal: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
  },
  itemStyle: {paddingVertical: Metrics.ratio(10), alignItems: 'center'},
  buttonStyle: {
    marginTop: Metrics.ratio(20),
    marginBottom: Metrics.ratio(16),
  },
  buttonTitle: {textTransform: 'capitalize'},
});
