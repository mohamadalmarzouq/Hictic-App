// @flow
import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '../../theme';

export default StyleSheet.create({
  body: {
    paddingVertical: Metrics.baseMargin,
    margin: Metrics.doubleBaseMargin,
    borderRadius: Metrics.smallMargin,
    backgroundColor: Colors.background.primary,
  },
  titleStyle: {
    textAlign: 'center',
    marginHorizontal: Metrics.baseMargin,
    marginBottom: Metrics.baseMargin,
  },
  descriptionStyle: {
    textAlign: 'center',
    marginHorizontal: Metrics.doubleBaseMargin,
    marginBottom: Metrics.baseMargin,
  },
  inputField: {marginHorizontal: Metrics.baseMargin},
  couponView: {
    marginBottom: Metrics.mediumMargin,
    alignItems: 'center',
  },
  couponTitle: {
    // textAlign: "center",
    marginHorizontal: Metrics.baseMargin,
    marginTop: Metrics.mediumMargin,
    marginBottom: Metrics.smallMargin / 2,
  },
  couponCode: {
    // textAlign: "center",
    marginHorizontal: Metrics.baseMargin,
    marginBottom: Metrics.smallMargin * 1.5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: Metrics.baseMargin,
  },
  errorStyle: {
    textAlign: 'center',
    marginHorizontal: Metrics.baseMargin,
  },
});
