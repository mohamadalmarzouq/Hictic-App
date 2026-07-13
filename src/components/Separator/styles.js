// @flow
import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.separator,
    height: Metrics.ratio(1),
    marginHorizontal: Metrics.baseMargin * 1.25,
  },
});
