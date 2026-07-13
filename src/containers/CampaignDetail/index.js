import _ from 'lodash';
import React from 'react';
import {View, Text, Animated, StatusBar, Platform} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';
import {
  BackButton,
  Separator,
  ScrollableHeader,
  ViewLayer,
} from '../../components';
import {
  RoundImage,
  IconText,
  SeeAll,
  TimerComponent,
  CustomAd,
  InterestedUsers,
  SelectionButton,
  TopScorers,
  EmptyView,
  RewardsCarousel,
  LanguageModal,
} from '../../specifics';
import {Images, ApplicationStyles, Colors, Strings, Metrics} from '../../theme';
import Utils from '../../utils';
import styles from './styles';
import {
  REWARD_TYPE_CASH,
  CURRENCY,
  CAMPAIGN_VIEWED_DELAY,
  REWARD_TYPE_COUPON,
  GAME_TYPE_AR,
  WIKITUDE_IOS_KEY,
  WIKITUDE_KEY,
} from '../../constants';
import NetInfo from '@react-native-community/netinfo';
import {connect} from 'react-redux';
import {WithFetching} from '../../HOC';
import {
  CAMPAIGN_DETAILS,
  CAMPAIGN_INTERESTED,
  CAMPAIGN_VIEWED,
  CAMPAIGN_PARTICIPATED,
} from '../../actions/ActionTypes';
import {generalAction, generalSaveAction} from '../../actions/GeneralAction';
import {
  BASE_URL,
  API_CAMPAIGN_DETAILS,
  API_CAMPAIGN_MARK_INTERESTED,
  API_CAMPAIGN_MARK_VIEWED,
  API_CAMPAIGN_CHECK_REGION,
  API_CAMPAIGN_PARTICIPATE,
  ERROR_NETWORK_NOT_AVAILABLE,
  ERROR_SOMETHING_WENT_WRONG,
} from '../../config/WebService';

import DateTime from './items/DateTime';
import PlayButton from './items/PlayButton';

import {getLocation} from '../../utils/MapUtils';
import {checkAndRequestPermission} from '../../utils/PermissionUtils';
// import Wikitude from 'react-native-wikitude';
import {PERMISSIONS} from 'react-native-permissions';
import { navNavigate } from '../../navigator';

// export const HEADER_MAX_HEIGHT = Metrics.screenHeight * 0.45;
export const HEADER_MAX_HEIGHT = Math.round(Metrics.screenHeight * 0.45);



class CampaignDetail extends React.Component {
  componentDidMount() {
    this._getCampaignDetail();

    // Example: subscribe to network changes
    this.netInfoUnsubscribe = NetInfo.addEventListener(state => {
      console.log('Network state changed:', state.isConnected);
    });

    // If you were using location watch, you could save it here
    // this.locationWatcher = watchLocation(...);
  }
 componentWillUnmount() {
    // Clean up NetInfo subscription
    if (this.netInfoUnsubscribe) {
      this.netInfoUnsubscribe();
      this.netInfoUnsubscribe = null;
    }
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    console.log("nextProps",nextProps);
    console.log("nextState",nextState);
    
    return (
      !_.isEqual(this.props.selectedCampaign, nextProps.selectedCampaign) ||
      !_.isEqual(this.props.networkInfo, nextProps.networkInfo) ||
      !_.isEqual(
        this.props.campaigns.isFetching,
        nextProps.campaigns.isFetching,
      ) ||
      !_.isEqual(this.props.campaigns.failure, nextProps.campaigns.failure) ||
      !_.isEqual(this.state, nextState)
    );
  }

  constructor(props) {
    super(props);

    const safeAreaTop = getStatusBarHeight(true);
    const safeAreaBottom = getBottomSpace();

    this.state = {
      isPullToRefresh: false,
      safeAreaTop,
      safeAreaBottom,
    };
  }

  /** ************** Requests ******************* **/

  _getCampaignDetail = (showLoader = true) => {
    console.log("this.props",this.props);
    
    // const {generalAction, cbShowLoader, user_id, campaign_id} = this.props;
    const { generalAction, cbShowLoader, user_id, route } = this.props;
const { campaign_id } = route.params;

    cbShowLoader(showLoader);
    generalAction(
      API_CAMPAIGN_DETAILS,
      {
        id: campaign_id,
        user_id,
      },
      CAMPAIGN_DETAILS.SUCCESS,
      CAMPAIGN_DETAILS.FAILURE,
      data => {
        this.setState({
          isPullToRefresh: false,
        });
        cbShowLoader(false);
        setTimeout(() => {
          this._markCampaignViewed();
        }, CAMPAIGN_VIEWED_DELAY);
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

    this._getCampaignDetail(false);
  };

  _markCampaignInterested = () => {
    const {
      generalAction,
      generalSaveAction,
      cbShowLoader,
      user_id,
      route,
      selectedCampaign,
    } = this.props;
    const { campaign_id } = route.params;
    // if (!selectedCampaign.is_interested) {
    cbShowLoader(true);
    // generalSaveAction(CAMPAIGN_INTERESTED.REQUEST, { campaign_id });
    generalAction(
      API_CAMPAIGN_MARK_INTERESTED,
      {
        campaign_id,
        user_id,
      },
      CAMPAIGN_INTERESTED.SUCCESS,
      CAMPAIGN_INTERESTED.FAILURE,
      (data, campaign_id) => {
        cbShowLoader(false);
      },
      err => {
        cbShowLoader(false);
      },
      false,
      false,
    );
    // }
  };

  _markCampaignViewed = () => {
    const {generalAction, user_id, selectedCampaign} = this.props;

    if (selectedCampaign && !selectedCampaign.is_viewed) {
      generalAction(
        API_CAMPAIGN_MARK_VIEWED,
        {
          campaign_id: selectedCampaign.id,
          user_id,
        },
        CAMPAIGN_VIEWED.SUCCESS,
        '',
        data => {},
        err => {},
        false,
        false,
      );
    }
  };

  _checkCampaignRegion = callback => {
    const {generalAction, cbShowLoader, user_id, route} = this.props;
    const { campaign_id } = route.params;

    cbShowLoader(true); // get location

    getLocation()
      .then(location => {
        generalAction(
          API_CAMPAIGN_CHECK_REGION,
          {
            campaign_id,
            user_id,
            latitude: location.latitude,
            longitude: location.longitude,
            // latitude: 24.8288959,
            // longitude: 67.0140212
          },
          '',
          '',
          data => {
            cbShowLoader(false);
            if (callback)
              setTimeout(() => {
                callback(data);
              }, 500);
          },
          err => {
            cbShowLoader(false);
          },
          false,
          true,
        );
      })
      .catch(err => {
        cbShowLoader(false);
        Utils.showMessage(ERROR_SOMETHING_WENT_WRONG.message);
      });
  };

  _markCampaignParticipated = () => {
    const {generalAction, user_id, selectedCampaign} = this.props;

    if (selectedCampaign && !selectedCampaign.is_participated) {
      generalAction(
        API_CAMPAIGN_PARTICIPATE,
        {
          campaign_id: selectedCampaign.id,
          user_id,
        },
        CAMPAIGN_PARTICIPATED.SUCCESS,
        '',
        data => {},
        err => {},
        false,
        false,
      );
    }
  };

  /** ************** button press ************** **/

//   _playPress = () => {
//     const {safeAreaTop, safeAreaBottom} = this.state;
//     const {user_id, route, selectedCampaign, networkInfo} = this.props;
//     const { campaign_id } = route.params;
//     const {game} = selectedCampaign;

//     console.log('game = ', game);

//     // check network connection
//     console.log("networkInfo",networkInfo);
    
//     if (true) {
//       console.log(
//         'networkInfo.isNetworkConnected',
//         networkInfo.isNetworkConnected,
//       );
//       // make silent request of participation
//       this._markCampaignParticipated();
//       // check game type
//       if (game.category_id === GAME_TYPE_AR) {
//         // AR
//         this._handleARGame(safeAreaTop, safeAreaBottom);
//       } else {
//         // this.languageModal.show();
//         this.props.navigation.navigate('gameView', {
//   user_id,
//   gameInfo: game,
//   campaign_id,
//   callBack: this._getCampaignDetail,
//   safeAreaTop,
//   safeAreaBottom,
//   baseUrl: BASE_URL,
//   ln: 'en',
// });
//         // Actions.gameView({
//         //   user_id,
//         //   gameInfo: game,
//         //   campaign_id,
//         //   callBack: this._getCampaignDetail,
//         //   safeAreaTop,
//         //   safeAreaBottom,
//         //   baseUrl: BASE_URL,
//         //   ln: 'en',
//         // });
//       }
//     } else {
//       Utils.showMessage(ERROR_NETWORK_NOT_AVAILABLE.message);
//     }
//   };

// _playPress = () => {
//   const { safeAreaTop, safeAreaBottom } = this.state;
//   const { user_id, route, selectedCampaign, networkInfo, navigation } = this.props;
//   const { campaign_id } = route.params;
//   const { game } = selectedCampaign;

//    console.log('game = ', game);

//     // check network connection
//     console.log("networkInfo",networkInfo);
    
//     if (true) {
//       console.log(
//         'networkInfo.isNetworkConnected',
//         networkInfo.isNetworkConnected,
//       );
//       // make silent request of participation
//       this._markCampaignParticipated();
//       // check game type
//       if (game.category_id === GAME_TYPE_AR) {
//         // AR
//         this._handleARGame(safeAreaTop, safeAreaBottom);
//       } else {
//         // this.languageModal.show();
//        navigation.navigate('gameView', {
//   user_id,
//   gameInfo: game,
//   campaign_id,
//   callBack: this._getCampaignDetail,
//   safeAreaTop,
//   safeAreaBottom,
//   baseUrl: BASE_URL,
//   ln: 'en',
// });
//         // Actions.gameView({
//         //   user_id,
//         //   gameInfo: game,
//         //   campaign_id,
//         //   callBack: this._getCampaignDetail,
//         //   safeAreaTop,
//         //   safeAreaBottom,
//         //   baseUrl: BASE_URL,
//         //   ln: 'en',
//         // });
//       }
//     } else {
//       Utils.showMessage(ERROR_NETWORK_NOT_AVAILABLE.message);
//     }
// };

// _playPress = () => {
//   const { safeAreaTop, safeAreaBottom } = this.state;
//   const { user_id, route, selectedCampaign, networkInfo, navigation } = this.props;
//   const { campaign_id } = route.params;

//   if (!selectedCampaign || !selectedCampaign.game) {
//     console.warn('No game data available');
//     return;
//   }

//   const { game } = selectedCampaign;
//   console.log('game = ', game);

//   // Check network connection
//   if (false) {
//     Utils.showMessage(ERROR_NETWORK_NOT_AVAILABLE.message);
//     return;
//   }

//   console.log('networkInfo.isNetworkConnected', networkInfo.isNetworkConnected);

//   // Make silent request of participation
//   this._markCampaignParticipated();

//   if (game.category_id === GAME_TYPE_AR) {
//     // AR game flow
//     this._handleARGame(safeAreaTop, safeAreaBottom);
//   } else {
//     // Normal game flow: show language modal or navigate directly
//     navigation.push('gameView', {
//       user_id,
//       gameInfo: game,
//       campaign_id,
//       callBack: this._getCampaignDetail, // callback to refresh CampaignDetail
//       safeAreaTop,
//       safeAreaBottom,
//       baseUrl: BASE_URL,
//       ln: 'en',
//     });
//   }
// };




_playPress = async () => {
  const { safeAreaTop, safeAreaBottom } = this.state;
  const { user_id, route, selectedCampaign, navigation } = this.props;
  const { campaign_id } = route.params;

  if (!selectedCampaign || !selectedCampaign.game) {
    console.warn('No game data available');
    return;
  }

  const { game } = selectedCampaign;

  try {
    // Check network connectivity
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      Utils.showMessage(ERROR_NETWORK_NOT_AVAILABLE.message);
      return;
    }

    console.log('Network connected, proceeding to game');

    // Mark campaign participated silently
    this._markCampaignParticipated();

    if (game.category_id === GAME_TYPE_AR) {
      // AR game flow
      this._handleARGame(safeAreaTop, safeAreaBottom);
    } else {
      // Normal game flow
      navigation.push('gameView', {
        user_id,
        gameInfo: game,
        campaign_id,
        callBack: this._getCampaignDetail, // refresh CampaignDetail on return
        safeAreaTop,
        safeAreaBottom,
        baseUrl: BASE_URL,
        ln: 'en',
      });
    }
  } catch (err) {
    console.warn('Error checking network', err);
    Utils.showMessage(ERROR_NETWORK_NOT_AVAILABLE.message);
  }
};

  _seePlayersPress = () => {
    const {id} = this.props.selectedCampaign;
    // Actions.leaderBoard({campaign_id: id});
    this.props.navigation.navigate("leaderBoard",{campaign_id: id})
  };

  _shareCampaign = () => {
    const {id, title} = this.props.selectedCampaign;
    Utils.shareCampaign(title, id);
  };

  _onTimerCallback = () => {
    const {is_ended} = this.props.selectedCampaign;
    if (!is_ended) {
      this._getCampaignDetail(false);
    }
  };

  _onCouponPress = item => {
    const {selectedCampaign} = this.props;

    const reward = {...selectedCampaign, coupon_detail: item};

    // Actions.rewardDetail({coupon_id: item.id});
    this.props.navigation.navigate("rewardDetail",{coupon_id: item.id})
    
  };

  /** ************** Methods ******************* **/

  _handleARGame = (safeAreaTop, safeAreaBottom) => {
    console.log('_handleARGame');
    // request camera permission
    // checkAndRequestPermission('camera', 'camera', 'camera required')
    checkAndRequestPermission(
      Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
      }),
      'Camera',
      'Camera Permission required',
    )
      .then(() => {
        console.log('CameraPermission Pass');
        // request location permission
        checkAndRequestPermission(
          Platform.select({
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          }),
          'Location',
          'Location Permission required',
        )
          .then(() => {
            console.log('LocationPermission Pass');
            // check campaign region exist in current location
            this._checkCampaignRegion(data => {
              console.log('CampaignRegion Pass');
              // if exist then open ar game
              if (data[0] && data[0].region_id) {
                console.log('_openARGame Pass');
                this._openARGame(
                  data[0].region_id,
                  safeAreaTop,
                  safeAreaBottom,
                );
              } else {
                console.log('errorMessageCampaignRegion Fail');
                // else show message
                Utils.showMessage(Strings.errorMessageCampaignRegion);
              }
            });
          })
          .catch(err => console.log('location error', err));
      })
      .catch(err => console.log('camera error', err));
  };

  _openARGame = (region_id, safeAreaTop, safeAreaBottom) => {
    const {user_id, route, selectedCampaign} = this.props;
    const { campaign_id } = route.params;
    const {game} = selectedCampaign;

    const {game_path} = game;
    const url =
      game_path +
      '?' +
      Utils.getQueryStrings({
        user_id,
        campaign_id,
        region_id,
      });

    const gameUrl = Utils.getImagePath(url);

    // "file:///android_asset/arwikitude/index.html?user_id=1&campaign_id=186&region_id=23",

    const path_android =
      'file:///android_asset/arwikitude/index.html?user_id=' +
      user_id +
      '&campaign_id=' +
      campaign_id +
      '&region_id=' +
      region_id +
      '&safeAreaTop=' +
      this.state.safeAreaTop +
      '&safeAreaBottom=' +
      this.state.safeAreaBottom +
      '$baseUrl=' +
      BASE_URL;

    const path_ios =
      'arwikitude/index.html?user_id=' +
      user_id +
      '&campaign_id=' +
      campaign_id +
      '&region_id=' +
      region_id +
      '&safeAreaTop=' +
      safeAreaTop +
      '&safeAreaBottom=' +
      safeAreaBottom +
      '$baseUrl=' +
      BASE_URL;

    // Wikitude.startAR(
    //   Utils.isPlatformAndroid() ? path_android : path_ios,
    //   true,
    //   true,
    //   true,
    //   Utils.isPlatformAndroid() ? WIKITUDE_KEY : WIKITUDE_IOS_KEY,
    // );
  };

  /** ************** Views ******************* **/

  _renderNavBar = animValue => {
    const headerScrollDistance = HEADER_MAX_HEIGHT;

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

    const {brand, is_ended} = this.props.selectedCampaign;
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

        {!is_ended && (
          <BackButton
            image={Images.share}
            tintColor={Colors.background.primary}
            onPress={this._shareCampaign}
          />
        )}
      </Animated.View>
    );
  };

  _renderTimer = data => {
    const {start_date_time, end_date_time} = data;
    return (
      <TimerComponent
        style={styles.timerStyle}
        digitBgColor={Colors.background.septenary}
        digitTxtColor={Colors.text.primary}
        timeTxtColor={Colors.text.primary}
        hideText
        isGradient
        start_date_time={start_date_time}
        end_date_time={end_date_time}
        callBack={this._onTimerCallback}
      />
    );
  };

  _renderTitle = ({title}) => {
    return (
      <Text
        style={[
          ApplicationStyles.b28Secondary,
          ApplicationStyles.textCenter,
          {marginHorizontal: Metrics.baseMargin * 1.25},
        ]}>
        {title}
      </Text>
    );
  };

  _renderPriceAndViews = data => {
    let {reward_type, views_count} = data;

    const {icon, prize} = Utils.getRewardPrizeAndIcon(data, 'white');

    return (
      <View style={styles.priceViewContainer}>
        {reward_type !== REWARD_TYPE_COUPON && (
          <IconText
            icon={icon}
            text={prize}
            style={{
              marginRight: Metrics.smallMargin * 1.5,
            }}
            textStyle={ApplicationStyles.re17Secondary}
          />
        )}
        <IconText
          icon={Images.users}
          text={`${Utils.formatNumber2K(views_count) || 0} views`}
          textStyle={ApplicationStyles.re17Secondary}
        />
      </View>
    );
  };

  _renderInterestedButton = ({is_interested, is_ended}) => {
    return (
      <SelectionButton
        title={is_interested ? Strings.button_notified : Strings.button_notify}
        isSelected={is_interested === 1}
        onPress={is_ended ? undefined : this._markCampaignInterested}
        style={{
          marginHorizontal: Metrics.baseMargin * 1.25,
          marginTop: Metrics.baseMargin * 1.25,
          marginBottom: Metrics.mediumMargin,
        }}
        disabled={is_ended}
      />
    );
  };

  _renderCustomAd = ({ad_title, ad_description, ad_image, ad_link}) => {
    return (
      <CustomAd
        title={ad_title}
        description={ad_description}
        image={ad_image}
        link={ad_link}
      />
    );
  };

  _renderInterestedUsers = ({interested_users, interested_users_count}) => {
    if (interested_users && interested_users.length > 0) {
      return (
        <React.Fragment>
          <SeeAll text={Strings.interested} />
          <InterestedUsers
            data={interested_users}
            count={interested_users_count}
          />
          <Separator />
        </React.Fragment>
      );
    }

    return null;
  };

  _renderDateTime = ({
    start_date,
    end_date,
    start_time,
    end_time,
    start_date_time,
    end_date_time,
  }) => {
    return (
      <DateTime
        start_date={start_date}
        end_date={end_date}
        start_time={start_time}
        end_time={end_time}
        start_date_time={start_date_time}
        end_date_time={end_date_time}
      />
    );
  };

  _renderDescription = ({description}) => {
    return (
      <React.Fragment>
        <Separator />
        <Text
          style={[ApplicationStyles.re17Secondary, styles.descriptionStyle]}>
          {description}
        </Text>
      </React.Fragment>
    );
  };

  _renderRewards = data => {
    const {coupons} = data;

    if (coupons && coupons.length > 0) {
      return (
        <React.Fragment>
          <Separator />
          <SeeAll
            text={Strings.rewards}
            style={{}}
            // onPress={this._seePlayersPress}
          />
          <RewardsCarousel data={data.coupons} onPress={this._onCouponPress} />
        </React.Fragment>
      );
    }
    return null;
  };

  _renderTopPlayers = data => {
    const {top_players} = data;
    console.log('DATA',top_players);

    if (top_players && top_players.length > 0) {
      return (
        <React.Fragment>
          <Separator />
          <SeeAll text={Strings.top_scorers} onPress={this._seePlayersPress} />
          <TopScorers data={top_players} />
        </React.Fragment>
      );
    }
    return null;
  };

  _renderBottomButton = data => {
    const {is_ended, is_started} = data;
    console.log('is_started = ', is_started);
    return (
      <PlayButton
        is_started={is_started}
        is_ended={is_ended}
        onPress={this._playPress}
      />
    );
  };

  _renderContent = data => {
    const {is_ended, is_started} = data;
    return (
      <View style={styles.contentContainer}>
        {/* this._renderTimer(data) */}
        {this._renderTitle(data)}
        {this._renderPriceAndViews(data)}
        {this._renderInterestedButton(data)}
        {data.ad_link != null && this._renderCustomAd(data)}
        {!is_started && this._renderInterestedUsers(data)}
        {this._renderDateTime(data)}
        {this._renderDescription(data)}
        {this._renderRewards(data)}
        {this._renderTopPlayers(data)}
      </View>
    );
  };

  _renderMainContent(data) {
    // setTimeout(() => {
    //   Actions.refresh({ hideNavBar: true });
    // }, 0);

    const {isPullToRefresh} = this.state;
    const {safeAreaTop, safeAreaBottom} = this.state;
    const {user_id, route, selectedCampaign, networkInfo} = this.props;
    const { campaign_id } = route.params;
    const {game} = selectedCampaign;

    return (
      <View style={[ApplicationStyles.scrollContainer]}>
        <ScrollableHeader
          headerMinHeight={Metrics.mediumMargin * 0}
          headerMaxHeight={HEADER_MAX_HEIGHT}
          headerImage={{
            // uri: "https://lorempixel.com/400/300/"
            uri: Utils.getImagePath(data.image),
          }}
          renderFixedHeader={this._renderNavBar}
          headerBackgroundColor={Colors.background.tertiary}
          ref={ref => {
            this.scrollableHeader = ref;
          }}
          
          onRefresh={this._onRefresh}
          refreshing={isPullToRefresh}
          data={data}
          timerCallback={this._onTimerCallback}>
          {this._renderContent(data)}
        </ScrollableHeader>
        {this._renderBottomButton(data)}
        <LanguageModal
          ref={ref => {
            this.languageModal = ref;
          }}
          onNext={selectedLanguage => {
            setTimeout(() => {
              // Actions.gameView({
              //   user_id,
              //   gameInfo: game,
              //   campaign_id,
              //   callBack: this._getCampaignDetail,
              //   safeAreaTop,
              //   safeAreaBottom,
              //   baseUrl: BASE_URL,
              //   ln: selectedLanguage,
              // });
               this.props.navigation.push('gameView', {
                user_id,
                gameInfo: game,
                campaign_id,
                callBack: this._getCampaignDetail,
                safeAreaTop,
                safeAreaBottom,
                baseUrl: BASE_URL,
                ln: selectedLanguage,
              });
            }, 300);
          }}
        />
      </View>
    );
  }

  _renderEmptyView = (errorMessage = '') => {
    return (
      <View style={ApplicationStyles.scrollContainer}>
        {this._renderEmptyHeader()}
        <EmptyView
          image={Images.emptyImages.campaigns}
          title={Strings.emptyTitles.campaignDetail}
          description={Strings.emptyDescriptions.campaignDetail}
          errorMessage={errorMessage}
          onPress={errorMessage ? this._getCampaignDetail : undefined}
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
            <Text style={ApplicationStyles.b22Primary}>Campaign Detail</Text>
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
    const {campaigns, selectedCampaign, networkInfo} = this.props;
    const {errorMessage} = campaigns;

    if (!selectedCampaign && errorMessage) {
      return this._renderEmptyView(errorMessage);
    }

    if (selectedCampaign) {
      return this._renderMainContent(selectedCampaign);
    }

    return <View style={ApplicationStyles.container} />;
  }
}

// const mapStateToProps = ({user, campaigns, networkInfo}, ownProps) => ({
//   user_id: user.data.id,
//   campaigns,
//   selectedCampaign: campaigns.data[ownProps.campaign_id],
//   networkInfo,
// });

const mapStateToProps = ({ user, campaigns, networkInfo }, ownProps) => {
  const campaign_id = ownProps.route?.params?.campaign_id;

  return {
    user_id: user.data.id,
    campaigns,
    selectedCampaign: campaigns.data[campaign_id],
    networkInfo,
  };
};


const actions = {
  generalAction,
  generalSaveAction,
};

export default connect(
  mapStateToProps,
  actions,
)(WithFetching(CampaignDetail, true, Images.gifs.loader));
