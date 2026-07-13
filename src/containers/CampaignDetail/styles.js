import {StyleSheet} from 'react-native';
import {ApplicationStyles, Colors, Metrics} from '../../theme';
import styles from '../../components/Loading/styles';

export default StyleSheet.create({
  contentContainer: {paddingTop: Metrics.mediumMargin},

  navbarContainer: {
    width: Metrics.screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navBarTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navBarImage: {
    marginRight: Metrics.smallMargin,
    borderRadius: Metrics.ratio(30),
    borderWidth: Metrics.smallMargin / 2,
  },

  timerStyle: {justifyContent: 'center', marginBottom: Metrics.smallMargin},
  priceViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Metrics.smallMargin,
    paddingHorizontal: Metrics.baseMargin * 1.25,
  },
  descriptionStyle: {
    lineHeight: 27,
    paddingHorizontal: Metrics.baseMargin * 1.25,
    paddingVertical: Metrics.smallMargin * 1.5,
  },
});
