import _ from 'lodash';
import React from 'react';
import {View, Text, Animated, StatusBar, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {BackButton, Separator, ScrollableHeader} from '../../components';
import {
  RoundImage,
  IconText,
  SeeAll,
  InterestedUsers,
  EmptyView,
  RedeemModal,
} from '../../specifics';
import {Images, ApplicationStyles, Colors, Strings, Metrics} from '../../theme';
import Utils from '../../utils';
import styles from './styles';
import {
  REWARD_TYPE_CASH,
  REWARD_TYPE_COUPON,
  DATE_FORMAT,
  TERMS_AND_CONDITION,
} from '../../constants';

import {connect} from 'react-redux';
import {WithFetching} from '../../HOC';
import {REWARDS, UPDATE_REWARD_REDEEMED} from '../../actions/ActionTypes';
import {generalAction, generalSaveAction} from '../../actions/GeneralAction';
import {
  API_REWARD_DETAIL,
  API_REDEEM_COUPON,
  ERROR_NETWORK_NOT_AVAILABLE,
} from '../../config/WebService';

import DateTime from './items/DateTime';
import PlayButton from './items/PlayButton';

class RewardDetail extends React.Component {
  componentDidMount() {
    this._getCouponDetail();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !_.isEqual(this.props.selectedReward, nextProps.selectedReward) ||
      !_.isEqual(this.props.networkInfo, nextProps.networkInfo) ||
      !_.isEqual(this.props.rewards.isFetching, nextProps.rewards.isFetching) ||
      !_.isEqual(this.props.rewards.failure, nextProps.rewards.failure) ||
      !_.isEqual(this.state, nextState)
    );
  }

  state = {
    isPullToRefresh: false,
    redeemCouponLoading: false,
    couponCode: '',
    couponError: '',
  };

  /** ************** Requests ******************* **/

  _getCouponDetail = (showLoader = true) => {
    console.log("this.props",this.props);
    
    const {generalAction, cbShowLoader, user_id} = this.props;
const{coupon_id}=this.props.route.params;
    if (!coupon_id) {
      return;
    }

    cbShowLoader(showLoader);
    generalAction(
      API_REWARD_DETAIL,
      {
        id: coupon_id,
        user_id,
      },
      REWARDS.SUCCESS,
      REWARDS.FAILURE,
      data => {
        this.setState({
          isPullToRefresh: false,
        });
        cbShowLoader(false);
      },
      err => {
        this.setState({
          isPullToRefresh: false,
        });
        cbShowLoader(false);
      },
      false,
      true,
    );
  };

  _onRefresh = () => {
    this.setState({
      isPullToRefresh: true,
    });

    this._getCouponDetail(false);
  };

  _redeemCoupon = branch_code => {
    const {
      generalAction,
      generalSaveAction,
      user_id,
      selectedReward,
    } = this.props;
    const{coupon_id}=this.props.route.params;

    if (!coupon_id) {
      return;
    }

    this.setState({
      redeemCouponLoading: true,
      couponError: '',
    });

    generalAction(
      API_REDEEM_COUPON,
      {
        id: selectedReward.coupon_detail.coupon.id,
        user_id,
        branch_code,
      },
      '',
      '',
      data => {
        this._handleRedeemResponse(data.coupon);
        generalSaveAction(UPDATE_REWARD_REDEEMED, {coupon_id, coupon: data});
      },
      err => {
        this._handleRedeemResponse('', err);
      },
      false,
      false,
      false,
    );
  };

  _handleRedeemResponse = (code = '', couponError = '') => {
    setTimeout(() => {
      this.setState({
        redeemCouponLoading: false,
        couponCode: code,
        couponError: couponError,
      });
    }, 1000);
  };

  /** ************** button press ****************/

  _onRedeemPress = () => {
    this.setState(
      {
        couponCode: '',
        couponError: '',
      },
      () => {
        this.redeemModel.show();
      },
    );
  };

  _onSharePress = () => {
    const {id, is_active, no_of_use, coupon} =
      this.props.selectedReward.coupon_detail;

    if (!is_active) {
      Utils.showMessage('Coupon Expired');
    } else if (no_of_use === coupon.redemeed) {
      Utils.showMessage('Coupon Limit Exceeded');
    } else {
      // Actions.searchUsers({coupon_id: id});
      this.props.navigation.navigate("searchUsers",{coupon_id: id})
    }
  };

  _onTermsPress = () => {
    // Actions.webView({
    //   subPath: TERMS_AND_CONDITION,
    // });
              this.props.navigation.navigate("webView", {
      subPath: TERMS_AND_CONDITION,
    });
  };

  /** ************** Views ******************* **/
  _renderIsRedeemed = () => {
    return (
      <View style={styles.redeemStatusContainer}>
        <Text style={ApplicationStyles.b13Primary}>{Strings.redeemed}</Text>
      </View>
    );
  };

  _renderTitle = data => {
    const isCoupon = data?.reward_type == REWARD_TYPE_COUPON;
    return (
      <View style={{justifyContent: 'center'}}>
        <Text
          style={[
            ApplicationStyles.b28Secondary,
            ApplicationStyles.textCenter,
            {marginHorizontal: Metrics.baseMargin * 1.25},
          ]}>
          {data.title}
        </Text>
        {/* {!isCoupon && data?.rewards_redeemed ? this._renderIsRedeemed() : null} */}
      </View>
    );
  };

  _renderLeftTitle = title => {
    return (
      <Text
        style={[
          ApplicationStyles.b22Secondary,
          {marginHorizontal: Metrics.baseMargin * 1.25, marginTop: 10},
        ]}>
        {title}
      </Text>
    );
  };

  _renderValidBranches = branchArray => (
    <React.Fragment>
      <SeeAll text={'Valid Branches'} />
      <View style={styles.validBranchesContainer}>
        {branchArray.map((item, index) => (
          <View key={index} style={styles.validBranchBoxStyle}>
            <Text style={ApplicationStyles.m17Primary}>{item.code}</Text>
          </View>
        ))}
      </View>
    </React.Fragment>
  );

  _renderPrize = data => {
    const {icon, prize} = Utils.getRewardPrizeAndIcon(data, 'white', true);

    return <IconText icon={icon} text={prize} style={styles.prizeContainer} />;
  };

  _renderDateTime = data => {
    const {start_date_time, end_date_time, coupon_detail, reward_type} = data;

    const endDate = end_date_time ? end_date_time.split(' ')[0] : '';
    const endTime = end_date_time ? end_date_time.split(' ')[1] : '';

    const isCoupon = data?.reward_type == REWARD_TYPE_COUPON;

    return (
      <React.Fragment>
        <Separator />
        <View style={styles.descriptionStyle}>
          {reward_type === REWARD_TYPE_COUPON &&
            this._renderTitleDescription(
              Strings.expiry,
              Utils.getDateTimeFormatInLocalGmt(
                endDate,
                endTime,
                DATE_FORMAT,
                coupon_detail.validity_for_days,
              ),
              {
                marginBottom: Metrics.ratio(12),
              },
            )}
          {!isCoupon
            ? data?.rewards_redeemed
              ? this._renderIsRedeemed()
              : null
            : coupon_detail?.no_of_use - coupon_detail?.coupon.redemeed == 0
            ? this._renderIsRedeemed()
            : null}
          {this._renderTitleDescription(
            Strings.reward_received_on,
            Utils.getDateTimeFormatInLocalGmt(endDate, endTime, DATE_FORMAT),
            {
              marginBottom:
                reward_type === REWARD_TYPE_COUPON ? Metrics.ratio(12) : 0,
            },
          )}
          {reward_type === REWARD_TYPE_COUPON &&
            this._renderTitleDescription(
              Strings.usage_left,
              coupon_detail.no_of_use - coupon_detail.coupon.redemeed,
              {marginBottom: 0},
            )}
        </View>
      </React.Fragment>
    );
  };

  _renderDescription = description => {
    return (
      <React.Fragment>
        <Separator />
        <Text
          style={[ApplicationStyles.re17Secondary, styles.descriptionStyle]}>
          {description}
        </Text>
        <Separator />
      </React.Fragment>
    );
  };
  _renderRewardDescription = description => {
    return (
      <React.Fragment>
        <Text
          style={[ApplicationStyles.re17Secondary, styles.descriptionStyle]}>
          {description}
        </Text>
      </React.Fragment>
    );
  };

  _renderBars = () => {
    return (
      <Text
        ellipsizeMode="clip"
        style={[ApplicationStyles.sb17Tertiary]}
        numberOfLines={1}>
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        - - - - - - - - - - - - - - - - - - -
      </Text>
    );
  };

  _renderRewardTitleAndValue = (title, value) => {
    return (
      <View style={{alignItems: 'center', flex: 1}}>
        <Text
          style={[ApplicationStyles.re15Secondary, styles.couponTitle]}
          numberOfLines={1}>
          {title}
        </Text>

        <Text
          style={[ApplicationStyles.b30Octonary, styles.couponCode]}
          numberOfLines={2}>
          {value}
        </Text>
      </View>
    );
  };

  _renderVerticalSeparator = () => {
    return (
      // <View
      //   style={styles.verticalSeparator}></View>
      <View style={{overflow: 'hidden'}}>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: Colors.text.tertiary,
            flex: 1,
          }}
        />
      </View>
    );
  };

  _renderRewardValueView = (isCoupon, rewardValue, redeemCode) => {
    return (
      <View style={styles.couponView}>
        {this._renderBars()}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {this._renderRewardTitleAndValue(
            isCoupon ? Strings.rewardCode : Strings.rewardAmount,
            isCoupon && rewardValue
              ? rewardValue
              : Utils.formatNumberComma(rewardValue) + ' KD',
          )}
          {redeemCode && (
            <>
              {this._renderVerticalSeparator()}
              {this._renderRewardTitleAndValue(Strings.redeemCode, redeemCode)}
            </>
          )}
        </View>

        {this._renderBars()}
      </View>
    );
  };

  _renderSharedUsers = (users, usersCount) => {
    if (users && users.length > 0 && usersCount) {
      return (
        <React.Fragment>
          {/* <Separator /> */}
          <SeeAll text={Strings.shared_with} />
          <InterestedUsers data={users} count={usersCount} />
          <Separator />
        </React.Fragment>
      );
    }

    return null;
  };

  _renderTitleDescription = (
    title,
    description,
    style = {marginBottom: Metrics.ratio(10)},
  ) => {
    return (
      <View style={style}>
        <Text
          style={[
            ApplicationStyles.re15Secondary,
            {marginBottom: Metrics.smallMargin / 2},
          ]}>
          {title}
        </Text>
        <Text style={ApplicationStyles.b20Secondary}> {description}</Text>
      </View>
    );
  };

  _renderTerms = () => {
    return (
      <React.Fragment>
        {/* <Separator /> */}
        <Text style={styles.termsStyle}>
          <Text
            style={ApplicationStyles.m14Quaternary}
            onPress={this._onTermsPress}>
            Terms and Conditions
          </Text>

          <Text style={[ApplicationStyles.re14Quaternary]}> Apply</Text>
        </Text>
      </React.Fragment>
    );
  };

  _renderBottomButton = data => {
    const {is_active, no_of_use, coupon} = data.coupon_detail;

    if (coupon) {
      return (
        <PlayButton
          onPress={this._onRedeemPress}
          isActive={is_active && no_of_use !== coupon.redemeed}
        />
      );
    }
    return null;
  };

  _renderRedeemModal = () => {
    const {redeemCouponLoading, couponCode, couponError} = this.state;
    return (
      <RedeemModal
        ref={ref => {
          this.redeemModel = ref;
        }}
        onPress={this._redeemCoupon}
        loading={redeemCouponLoading}
        couponCode={couponCode}
        error={couponError}
      />
    );
  };

  _renderNavBar = animValue => {
    const headerScrollDistance = Metrics.ratio(240);

    const tintColor = animValue.interpolate({
      inputRange: [0, headerScrollDistance],
      outputRange: [Colors.transparent, Colors.navbar.background2],
      extrapolate: 'clamp',
    });

    const tintGradientOverlay = animValue.interpolate({
      inputRange: [0, headerScrollDistance],
      outputRange: [Colors.background.quaternary, Colors.background.primary],
      extrapolate: 'clamp',
    });

    const {user_id, selectedReward} = this.props;
    const {brand, is_ended, reward_type, user} = selectedReward;
    const {name, photo} = brand;

    return (
      <Animated.View
        style={[
          styles.navbarContainer,
          {
            backgroundColor: Colors.background.quaternary,
            // backgroundColor: tintColor,
            paddingTop: Utils.isPlatformAndroid() ? 25 : Metrics.statusBarHeight,
          },
        ]}>
        <BackButton tintColor={Colors.background.primary} />
        <View style={styles.navBarTitleContainer}>
          <Animated.View
            style={[
              styles.navBarImage,
              {
                borderColor: Colors.background.senary,
                // borderColor: tintGradientOverlay,
              },
            ]}>
            <RoundImage
              image={Utils.getImagePath(photo)}
              imageSize={36}
              imageBorderWidth={0}
              hideShadow
            />
          </Animated.View>

          <Text
            style={[ApplicationStyles.b20Primary, ApplicationStyles.flex]}
            numberOfLines={2}>
            {name}
          </Text>
        </View>

        {reward_type === REWARD_TYPE_COUPON && user_id === user && (
          <BackButton
            image={Images.share}
            tintColor={Colors.background.primary}
            onPress={this._onSharePress}
          />
        )}
      </Animated.View>
    );
  };

  _renderContent = data => {
    console.log('===========data=============', data);

    const {
      title,
      description,
      shared_coupon_users,
      shared_coupon_users_count,
      coupon_detail,
      reward_type,
      reward_price,
      branch_codes,
      redeem_code,
    } = data;

    const rewardValue =
      reward_type == REWARD_TYPE_COUPON
        ? coupon_detail?.coupon.coupon
        : reward_price;

    const isCoupon = reward_type == REWARD_TYPE_COUPON;

    const branchArr =
      isCoupon && coupon_detail ? coupon_detail.branch : branch_codes;

    console.log(
      'CHECK COUPON',
      isCoupon && coupon_detail ? coupon_detail.branch : branch_codes,
    );

    return (
      <View style={styles.contentContainer}>
        {this._renderTitle(data)}
        {this._renderPrize(data)}
        {this._renderDateTime(data)}
        {isCoupon
          ? coupon_detail?.description
            ? this._renderDescription(coupon_detail?.description)
            : null
          : this._renderDescription(description)}
        {this._renderLeftTitle(Strings.navbar_title.rewardDetail)}
        {this._renderRewardDescription(
          reward_type == REWARD_TYPE_COUPON
            ? Strings.rewardCodeCongratulation
            : Strings.rewardAmountCongratulation,
        )}
        {branchArr && branchArr?.length
          ? this._renderValidBranches(branchArr)
          : null}
        {this._renderRewardValueView(isCoupon, rewardValue, redeem_code)}
        {this._renderSharedUsers(
          shared_coupon_users,
          shared_coupon_users_count,
        )}

        {this._renderTerms()}
      </View>
    );
  };

  _renderMainContent = data => {
    const {isPullToRefresh} = this.state;

    const {reward_type} = data;

    return (
      <View style={[ApplicationStyles.scrollContainer]}>
        <ScrollableHeader
          headerMinHeight={0}
          headerImage={{
            uri: Utils.getImagePath(data.image),
          }}
          renderFixedHeader={this._renderNavBar}
          headerBackgroundColor={Colors.background.tertiary}
          ref={ref => {
            this.scrollableHeader = ref;
          }}
          onRefresh={
            reward_type === REWARD_TYPE_COUPON ? this._onRefresh : undefined
          }
          refreshing={
            reward_type === REWARD_TYPE_COUPON ? isPullToRefresh : false
          }>
          {this._renderContent(data)}
        </ScrollableHeader>
        {/* {reward_type === REWARD_TYPE_COUPON && this._renderBottomButton(data)}
        {reward_type === REWARD_TYPE_COUPON && this._renderRedeemModal()} */}
      </View>
    );
  };

  _renderEmptyView = (errorMessage = '') => {
    return (
      <View style={ApplicationStyles.scrollContainer}>
        {this._renderEmptyHeader()}
        <EmptyView
          image={Images.emptyImages.rewards}
          title={Strings.emptyTitles.campaignDetail}
          description={Strings.emptyDescriptions.campaignDetail}
          errorMessage={errorMessage}
          onPress={errorMessage ? this._getCouponDetail : undefined}
          bottomStyle={{paddingHorizontal: Metrics.baseMargin * 1.25}}
        />
      </View>
    );
  };

  _renderEmptyHeader = () => {
    return (
      <View
        style={[
          {
            backgroundColor: Colors.navbar.background2,
            paddingTop: Utils.isPlatformAndroid() ? 0 : Metrics.statusBarHeight,
            flexDirection: 'row',
          },
        ]}>
        <View
          style={{
            width: Metrics.screenWidth,
            height: Metrics.navBarHeightWithoutStatusBar,
            justifyContent: 'center',
          }}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: Utils.isPlatformAndroid() ? Metrics.ratio(56) : 0,
              right: 0,
              top: 0,
              justifyContent: 'center',
              alignItems: Utils.isPlatformAndroid() ? 'flex-start' : 'center',
            }}>
            <Text style={ApplicationStyles.b22Primary}>Reward Detail</Text>
          </View>
          <BackButton
            tintColor={Colors.background.primary}
            style={{width: Metrics.ratio(50)}}
          />
        </View>
      </View>
    );
  };

  render() {
    const {rewards, selectedReward, networkInfo} = this.props;
    const {errorMessage} = rewards;
    console.log('SEELCTED', selectedReward);
    if (!selectedReward && errorMessage) {
      return this._renderEmptyView(errorMessage);
    }

    if (selectedReward) {
      return this._renderMainContent(selectedReward);
    }

    return <View style={ApplicationStyles.container} />;
  }
}

const mapStateToProps = ({user, rewards, networkInfo}, ownProps) => ({
  user_id: user.data.id,
  rewards,
  selectedReward: ownProps.route.params.coupon_id
    ? rewards.data[ownProps.route.params.coupon_id]
    : ownProps.route.params.reward,
  networkInfo,
});

const actions = {
  generalAction,
  generalSaveAction,
};

export default connect(mapStateToProps, actions)(WithFetching(RewardDetail));
