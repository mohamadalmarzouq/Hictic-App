import {StyleSheet} from 'react-native';
import {Metrics} from '../../theme';

export default StyleSheet.create({
  container: {paddingTop: Metrics.smallMargin},
  headerStyle: {
    flexDirection: 'row',
    paddingVertical: Metrics.baseMargin * 2,
    paddingHorizontal: Metrics.baseMargin,
    alignItems: 'center',
  },

  imageBgStyle: {
    flexDirection: 'row',
    width: '100%',
    height:
      Metrics.ratio(60) +
      Metrics.doubleBaseMargin * 2 +
      Metrics.statusBarHeight,

    paddingTop: Metrics.baseMargin,
    alignItems: 'center',
  },
  headerImageStyle: {
    marginLeft: Metrics.baseMargin,
    width: Metrics.ratio(60),
    height: Metrics.ratio(60),
  },
  headerTextContainer: {flex: 1, marginHorizontal: Metrics.baseMargin},
  footerStyle: {
    padding: Metrics.baseMargin,
    // padding: Metrics.baseMargin * 1.25,
    // marginTop: Metrics.ratio(60),
    marginBottom: Metrics.smallMargin,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingTop: Metrics.baseMargin,
    // paddingBottom: Metrics.ratio(40)
  },
  iconStyle: {marginRight: Metrics.ratio(13) , marginLeft:Metrics.ratio(1.5)},
});
