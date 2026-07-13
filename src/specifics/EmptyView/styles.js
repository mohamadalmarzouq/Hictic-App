// @flow
import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparent,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    marginTop: Metrics.smallMargin,
  },
  image: {
    alignSelf: 'center',
    marginBottom: Metrics.mediumMargin * 2,
  },
  title: {textAlign: 'center'},
  button: {
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
  },
});
