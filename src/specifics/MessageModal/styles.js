// @flow
import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  modal: {
    margin: 0,
  },
  body: {
    padding: Metrics.ratio(20),
    margin: Metrics.ratio(32),
    borderRadius: Metrics.ratio(8),
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
  },
  button: {
    flex: 1,
    height: Metrics.ratio(60),
  },
  descriptionStyle: {
    marginBottom: Metrics.ratio(24),
    textAlign: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  buttonCancel: {
    flex: 1,
    borderWidth: 1,
    height: Metrics.ratio(50),
    borderColor: Colors.black,
    borderRadius: Metrics.borderRadius,
    backgroundColor: Colors.transparent,
    marginRight: Metrics.smallMargin,
  },
});
