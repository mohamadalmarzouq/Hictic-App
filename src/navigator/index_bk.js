import React from 'react';
import {connect} from 'react-redux';
import {
  Stack,
  Scene,
  Router,
  Actions,
  ActionConst,
} from 'react-native-router-flux';
import {View, StatusBar} from 'react-native';
import {BackButton} from '../components';
import {
  LoginSelection,
  Login,
  SignUp,
  ForgotPwd,
  Verification,
  NewPassword,
  Home,
  ChangePwd,
  ChangePhone,
  MyProfile,
  AccountSettings,
  Support,
  Rewards,
  Notifications,
  EditProfile,
  InterestedCampaigns,
  MissedCampaigns,
  NewlyAdded,
  Participated,
  Filter,
  LeaderBoard,
  CampaignDetail,
  SearchedCampaigns,
  FilteredCampaigns,
  SocialSignUp,
  GameView,
  WebView,
  CampaignComments,
  SearchUsers,
  Invite,
  RewardDetail,
} from '../containers';
import DataHandler from '../services/DataHandler';
import Utils from '../utils';
import styles from './styles';
import {Strings, Colors} from '../theme';
const screens = ['gameView'];

function onBackPress() {
  if (screens.includes(Actions.currentScene)) {
    return true; // means handled
  }

  return false; // default system handling

  // if (Actions.state.index === 0) {
  //   return false;
  // }
  // Actions.pop();
  // return true;
}

const loginNavigator = () => (
  <Stack
    key="loginNavigator"
    navigationBarStyle={styles.header}
    type={ActionConst.RESET}
    renderBackButton={() => <BackButton />}>
    <Scene key="loginSelection" component={LoginSelection} hideNavBar />
    <Scene key="login" component={Login} />
    <Scene key="signUp" component={SignUp} />
    <Scene key="forgotPwd" component={ForgotPwd} />
    <Scene key="socialSignUp" component={SocialSignUp} />
    <Scene key="verification" component={Verification} />
    <Scene key="newPassword" component={NewPassword} />
  </Stack>
);

const mainNavigator = () => (
  <Stack
    key="mainNavigator"
    navigationBarStyle={[
      styles.header,
      {
        backgroundColor: Colors.navbar.background2,
      },
    ]}
    type={ActionConst.RESET}
    renderBackButton={() => (
      <BackButton tintColor={Colors.navbar.iconTintPrimary} />
    )}>
    <Scene key="home" component={Home} hideNavBar />

    <Scene
      key="myProfile"
      component={MyProfile}
      title={Strings.navbar_title.myProfile}
    />
    <Scene
      key="accountSettings"
      component={AccountSettings}
      title={Strings.navbar_title.accountSettings}
    />
    <Scene
      key="support"
      component={Support}
      title={Strings.navbar_title.support}
    />
    <Scene
      key="changePassword"
      component={ChangePwd}
      navigationBarStyle={styles.header}
      renderBackButton={() => (
        <BackButton tintColor={Colors.navbar.iconTintSecondary} />
      )}
    />
    <Scene
      key="changePhone"
      component={ChangePhone}
      navigationBarStyle={styles.header}
      renderBackButton={() => (
        <BackButton tintColor={Colors.navbar.iconTintSecondary} />
      )}
    />
    <Scene
      key="verificationMain"
      component={Verification}
      navigationBarStyle={styles.header}
      renderBackButton={() => (
        <BackButton tintColor={Colors.navbar.iconTintSecondary} />
      )}
    />
    <Scene
      key="rewards"
      component={Rewards}
      title={Strings.navbar_title.rewards}
    />
    <Scene
      key="notifications"
      component={Notifications}
      title={Strings.navbar_title.notifications}
    />
    <Scene
      key="editProfile"
      component={EditProfile}
      title={Strings.navbar_title.editProfile}
    />
    <Scene
      key="interestedCampaigns"
      component={InterestedCampaigns}
      title={Strings.navbar_title.interestedCampaigns}
    />
    <Scene
      key="missedCampaigns"
      component={MissedCampaigns}
      title={Strings.navbar_title.missedCampaigns}
    />

    <Scene
      key="newlyAdded"
      component={NewlyAdded}
      title={Strings.navbar_title.newlyAdded}
    />
    <Scene
      key="participated"
      component={Participated}
      title={Strings.navbar_title.participated}
    />
    <Scene
      key="filter"
      component={Filter}
      title={Strings.navbar_title.filter}
    />
    <Scene
      key="leaderBoard"
      component={LeaderBoard}
      title={Strings.navbar_title.leaderBoard}
    />
    <Scene
      key="campaignDetail"
      component={CampaignDetail}
      hideNavBar
      onEnter={() => {
        if (Utils.isPlatformAndroid()) {
          setTimeout(() => {
            // StatusBar.setTranslucent(true);
            //StatusBar.setBackgroundColor(Colors.transparent);
          }, 200);
        } else {
          StatusBar.setBarStyle('light-content');
        }
      }}
      onExit={() => {
        if (Utils.isPlatformAndroid()) {
          setTimeout(() => {
            // StatusBar.setTranslucent(false);
            // StatusBar.setBackgroundColor(Colors.navbar.background2);
          }, 200);
        } else {
          StatusBar.setBarStyle('dark-content');
        }
      }}
      title={Strings.navbar_title.campaignDetail}
    />
    <Scene
      key="searchedCampaigns"
      component={SearchedCampaigns}
      title={Strings.navbar_title.searchedCampaigns}
    />
    <Scene
      key="filterCampaigns"
      component={FilteredCampaigns}
      title={Strings.navbar_title.filteredCampaigns}
    />

    <Scene
      key="gameView"
      component={GameView}
      title={Strings.navbar_title.gameView}
      hideNavBar
      panHandlers={null}
      gesturesEnabled={false}
      onEnter={() => {
        StatusBar.setHidden(true);
      }}
      onExit={() => {
        StatusBar.setHidden(false);
      }}
    />
    <Scene
      key="webView"
      component={WebView}
      title={Strings.navbar_title.filteredCampaigns}
    />

    <Scene
      key="campaignComments"
      component={CampaignComments}
      title={Strings.navbar_title.comments}
    />

    <Scene
      key="searchUsers"
      component={SearchUsers}
      title={Strings.navbar_title.search_people}
    />

    <Scene
      key="invite"
      component={Invite}
      title={Strings.navbar_title.invite_friends}
    />

    <Scene
      key="rewardDetail"
      component={RewardDetail}
      hideNavBar
      onEnter={() => {
        if (Utils.isPlatformAndroid()) {
          setTimeout(() => {
            // StatusBar.setTranslucent(true);
            //StatusBar.setBackgroundColor(Colors.transparent);
          }, 200);
        } else {
          StatusBar.setBarStyle('light-content');
        }
      }}
      onExit={() => {
        if (Utils.isPlatformAndroid()) {
          setTimeout(() => {
            // StatusBar.setTranslucent(false);
            // StatusBar.setBackgroundColor(Colors.navbar.background2);
          }, 200);
        } else {
          StatusBar.setBarStyle('dark-content');
        }
      }}
      title={Strings.navbar_title.rewardDetail}
    />
  </Stack>
);

let navigator = Actions.create(
  <Stack key="root" hideNavBar titleStyle={styles.title} backTitle=" ">
    {loginNavigator()}
    {mainNavigator()}
  </Stack>,
);

export default () => {
  if (DataHandler.isLoggedIn()) {
    navigator = Actions.create(
      <Stack key="root" hideNavBar titleStyle={styles.title} backTitle=" ">
        {mainNavigator()}
        {loginNavigator()}
      </Stack>,
    );
  }

  const AppNavigator = connect()(Router);

  return (
    <AppNavigator
      navigator={navigator}
      backAndroidHandler={onBackPress}
      // uriPrefix={Utils.isPlatformIOS() ? "hictic://" : "hictic://share"}
      // onDeepLink={data => {
      //   setTimeout(() => {
      //     alert("Hi");
      //   }, 10000);
      //   // Utils.deepLinkNavigation(data);
      // }}
    />
  );
};
