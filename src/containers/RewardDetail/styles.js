import {StyleSheet} from 'react-native';
import {ApplicationStyles, Colors, Metrics} from '../../theme';
import styles from '../../components/Loading/styles';

export default StyleSheet.create({
  contentContainer: {paddingTop: Metrics.ratio(10)},

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
  prizeContainer: {
    alignSelf: 'center',
    margin: Metrics.baseMargin * 1.25,
    marginTop: Metrics.smallMargin / 2,
  },

  descriptionStyle: {
    lineHeight: 27,
    paddingHorizontal: Metrics.baseMargin * 1.25,
    paddingVertical: Metrics.smallMargin * 1.25,
  },
  termsStyle: {
    margin: Metrics.baseMargin * 1.25,
    alignSelf: 'center',
    marginBottom: Metrics.doubleBaseMargin,
  },
  validBranchesContainer: {
    marginHorizontal: Metrics.baseMargin * 1.25,
    marginBottom: Metrics.baseMargin,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  validBranchBoxStyle: {
    backgroundColor: Colors.background.quaternary,
    paddingHorizontal: Metrics.smallMargin * 1.25,
    paddingVertical: Metrics.smallMargin / 1.6,
    borderRadius: Metrics.borderRadius,
    marginRight: Metrics.smallMargin * 1.25,
    marginTop: Metrics.smallMargin * 1.25,
  },
  couponView: {
    // marginBottom: Metrics.ratio(10),
    // alignItems: 'center',
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
  redeemStatusContainer: {
    borderRadius: Metrics.borderRadius / 1.15,
    backgroundColor: Colors.background.denary,
    padding: Metrics.smallMargin / 1.5,
    position: 'absolute',
    right: Metrics.baseMargin * 1.25,
    marginTop: Metrics.ratio(10),
  },
  verticalSeparator: {
    width: 5,
    borderLeftWidth: 2,
    borderColor: Colors.text.tertiary,
    // borderStyle: 'dashed',
  },
});
