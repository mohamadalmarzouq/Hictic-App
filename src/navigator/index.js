// navigation/index.js
import React, { useEffect, useRef } from 'react';
import { BackHandler, StatusBar, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  CommonActions,
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BackButton, TabIcon } from '../components';

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
import { Strings, Colors, Metrics, Images } from '../theme';

// Keep this list same as your original file
const screens = ['gameView'];

// navigation ref (used for backHandler and optional external navigation)
export const navigationRef = createNavigationContainerRef();

// simple helper to get current route name (safe)
function getCurrentRouteName() {
  try {
    if (!navigationRef.isReady()) return null;
    const route = navigationRef.getCurrentRoute();
    return route ? route.name : null;
  } catch (e) {
    return null;
  }
}

// Back handler (hardware)
function useAndroidBackHandler() {
  useEffect(() => {
    const onBackPress = () => {
      const current = getCurrentRouteName();
      if (current && screens.includes(current)) {
        // handled (block back)
        return true;
      }

      if (navigationRef.isReady() && navigationRef.canGoBack()) {
        // go back if possible
        navigationRef.goBack();
        return true;
      }

      // let system handle (exit app)
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);
}

// Create navigators
const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tabs = createBottomTabNavigator();

// GLOBAL NAVIGATION HELPERS (use anywhere, no component needed)
import { StackActions } from '@react-navigation/native';

export function navNavigate(name, params = {}) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function navReplace(name, params = {}) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
}

export function navPush(name, params = {}) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params));
  }
}

export function navPop(count = 1) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(count));
  }
}

export function navPopToTop() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popToTop());
  }
}

export function navGoBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function navPopTo(screenName) {
  if (!navigationRef.isReady()) return;

  const state = navigationRef.getRootState();

  // Find the index of target screen
  const index = state?.routes?.findIndex(r => r.name === screenName);

  if (index === -1) {
    console.warn(`Screen ${screenName} not found in stack`);
    return;
  }

  // Number of screens to pop
  const pops = state.routes.length - index - 1;

  if (pops > 0) {
    navigationRef.dispatch(StackActions.pop(pops));
  }
}


export function navReset(name, params = {}) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name, params }],
      }),
    );
  }
}


// ----------------- Auth stack (loginNavigator) -----------------
function LoginNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="loginSelection"
      screenOptions={{
        headerStyle: styles.header,
        headerBackTitleVisible: false,
        // apply similar transition
        ...TransitionPresets.SlideFromRightIOS,
        headerLeft: () => <BackButton />,
      }}>
      <AuthStack.Screen
        name="loginSelection"
        component={LoginSelection}
        options={{ headerShown: false }}
      />
      {/* <AuthStack.Screen name="login" component={Login} screenOptions={{}} /> */}
      <AuthStack.Screen
  name="login"
  component={Login}
  options={{
    headerTitle: "", 
  }}
/>
      <AuthStack.Screen name="signUp" component={SignUp}  options={{
    headerTitle: "",     
  }} />
      <AuthStack.Screen name="forgotPwd" component={ForgotPwd}  options={{
    headerTitle: "",       
  }} />
      <AuthStack.Screen name="socialSignUp" component={SocialSignUp}  options={{
    headerTitle: "",        
  }} />
      <AuthStack.Screen name="verification" component={Verification}  options={{
    headerTitle: "",       
  }} />
      <AuthStack.Screen name="newPassword" component={NewPassword}  options={{
    headerTitle: "",        
  }} />
    </AuthStack.Navigator>
  );
}

// ----------------- Tabs (mainNavigatorTabs) -----------------
// function MainTabs() {
//   return (
//     <Tabs.Navigator
//       initialRouteName="home"
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: styles.tabBarStyle,
//         tabBarShowLabel: false,
//       }}>
//       <Tabs.Screen
//         name="home"
//         component={Home}
//         options={{
//           title: 'home',
//           tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
//         }}
//       />
//       <Tabs.Screen
//         name="notifications"
//         component={Notifications}
//         options={{
//           title: Strings.navbar_title.notifications,
//           tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
//         }}
//         listeners={{
//           focus: () => {
//             // replicate onEnter={() => Utils.resetNotificationCount()}
//             if (Utils && Utils.resetNotificationCount) {
//               try {
//                 Utils.resetNotificationCount();
//               } catch (e) {}
//             }
//           },
//         }}
//       />
//       <Tabs.Screen
//         name="rewards"
//         component={Rewards}
//         options={{
//           title: Strings.navbar_title.rewards,
//           tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
//         }}
//       />
//     </Tabs.Navigator>
//   );
// }


// function MainTabs() {
//   return (
//     <Tabs.Navigator
//       initialRouteName="home"
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: styles.tabBarStyle,
//         tabBarShowLabel: false,
//       }}>
      
//       <Tabs.Screen
//         name="home"
//         component={Home}
//         options={{
//           title: 'home',
//           tabBarIcon: ({ focused }) => (
//             <TabIcon title="home" focused={focused} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="notifications"
//         component={Notifications}
//         options={{
//           headerShown:true,
//           title: Strings.navbar_title.notifications,
//           tabBarIcon: ({ focused }) => (
//             <TabIcon
//               title={Strings.navbar_title.notifications}
//               focused={focused}
//             />
//           ),
//         }}
//         listeners={{
//           focus: () => {
//             if (Utils?.resetNotificationCount) {
//               try {
//                 Utils.resetNotificationCount();
//               } catch (e) {}
//             }
//           },
//         }}
//       />

//       <Tabs.Screen
//         name="rewards"
//         component={Rewards}
//         options={{
//           headerShown:true,
//           title: Strings.navbar_title.rewards,
//           tabBarIcon: ({ focused }) => (
//             <TabIcon
//               title={Strings.navbar_title.rewards}
//               focused={focused}
//             />
//           ),
//         }}
//       />

//     </Tabs.Navigator>
//   );
// }

const HomeStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const RewardsStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={({ navigation }) => ({
      headerShown:false
      })}
    >
      <HomeStack.Screen name="homeMain" component={Home} options={{ title: "Home" }} />
    </HomeStack.Navigator>
  );
}

function NotificationsStackScreen() {
  return (
    <NotificationsStack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => <DrawerButton navigation={navigation} />,
        headerStyle: [styles.header,{backgroundColor:'#FFC100'}],
        headerTitleAlign:"center",
        headerTitleStyle: Utils.isPlatformAndroid() ? styles.titleCenter : styles.title,
      })}
    >
      <NotificationsStack.Screen
        name="notificationsMain"
        component={Notifications}
        options={{ title: Strings.navbar_title.notifications }}
      />
    </NotificationsStack.Navigator>
  );
}

function DrawerButton({ navigation }) {
  return (
    <BackButton
      onPress={() => navigation.toggleDrawer()}
      image={Images.tabs.myprofile}  
      tintColor={"#FFF"} // <-- use your menu icon
    />
  );
}


function RewardsStackScreen() {
  return (
    <RewardsStack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => <DrawerButton navigation={navigation} />,
        headerStyle: [styles.header,{backgroundColor:'#FFC100'}],
        headerTitleAlign:"center",
        headerTitleStyle: Utils.isPlatformAndroid() ? styles.titleCenter : styles.title,
      })}
    >
      <RewardsStack.Screen
        name="rewardsMain"
        component={Rewards}
        options={{ title: Strings.navbar_title.rewards }}
      />
    </RewardsStack.Navigator>
  );
}

// function MainTabs() {
//   return (
//     <Tabs.Navigator
//       initialRouteName="home"
//       screenOptions={{
//         tabBarStyle: styles.tabBarStyle,
//         tabBarShowLabel: false,
//       }}
//     >

//       {/* Home — old Scene had hideNavBar, so keep no header */}
//       <Tabs.Screen
//         name="home"
//         component={Home}
//         options={{
//           headerShown: false,
//           title: 'home',
//           tabBarIcon: ({ focused }) => (
//             <TabIcon title="home" focused={focused} />
//           ),
//         }}
//       />

//       {/* Notifications — should show header like old Scene */}
//       <Tabs.Screen
//         name="notifications"
//         component={Notifications}
//         options={{
//           headerShown: true,
//           title: Strings.navbar_title.notifications,
//           headerTitleStyle: Utils.isPlatformAndroid() ? styles.titleCenter : styles.title,
//           headerStyle: [styles.header,{backgroundColor:'#FFC100'}],
//           tabBarIcon: ({ focused }) => (
//             <TabIcon
//               title={Strings.navbar_title.notifications}
//               focused={focused}
//             />
//           ),
//         }}
//         listeners={{
//           focus: () => {
//             if (Utils?.resetNotificationCount) {
//               try { Utils.resetNotificationCount(); } catch (e) {}
//             }
//           },
//         }}
//       />

//       {/* Rewards — same header as old Scene */}
//       <Tabs.Screen
//         name="rewards"
//         component={Rewards}
//         options={{
//           headerShown: true,
//           title: Strings.navbar_title.rewards,
//           headerTitleStyle: Utils.isPlatformAndroid() ? styles.titleCenter : styles.title,
//           headerStyle: [styles.header,{backgroundColor:'#FFC100'}],
//           tabBarIcon: ({ focused }) => (
//             <TabIcon
//               title={Strings.navbar_title.rewards}
//               focused={focused}
//             />
//           ),
//         }}
//       />

//     </Tabs.Navigator>
//   );
// }

function MainTabs() {
  return (
    <Tabs.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,   // header handled by stack!
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false,
      }}
    >

      <Tabs.Screen
        name="home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon title="home" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        component={NotificationsStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              title={Strings.navbar_title.notifications}
              focused={focused}
            />
          ),
        }}
             listeners={{
          focus: () => {
            if (Utils?.resetNotificationCount) {
              try {
                Utils.resetNotificationCount();
              } catch (e) {
                console.log("notifications listener error",e);
                
              }
            }
          },
        }}
      />

      <Tabs.Screen
        name="rewards"
        component={RewardsStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              title={Strings.navbar_title.rewards}
              focused={focused}
            />
          ),
        }}
      />

    </Tabs.Navigator>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="tabs"
      // drawerContent={() => <MyProfile  />}
      drawerContent={(props) => <MyProfile {...props} />}
      screenOptions={{ headerShown: false }}
      drawerStyle={{ width: Metrics.screenWidth * 0.85 }}>
      <Drawer.Screen
        name="tabs"
        component={MainTabs}
        options={{
          drawerIcon: () => (
            <Image
              style={
                Platform.OS === 'android'
                  ? { marginLeft: 12 }
                  : { marginLeft: 12, bottom: 3 }
              }
              source={Images.tabs.myprofile}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function MainNavigator() {
  console.log("here in mainnavigator");
  
  return (
    <MainStack.Navigator
      initialRouteName="MainDrawer"
      screenOptions={{
        headerStyle: [styles.header, { backgroundColor: Colors.navbar.background2 }],
        headerTitleStyle: Utils.isPlatformAndroid() ? styles.titleCenter : styles.title,
        headerBackTitleVisible: false,
        ...TransitionPresets.SlideFromRightIOS,
        headerLeft: props => <BackButton tintColor={Colors.navbar.iconTintPrimary} {...props} />,
      }}>
      {/* Tabs start (wrapped inside drawer) */}
      <MainStack.Screen
        name="MainDrawer"
        component={MainDrawer}
        options={{ headerShown: false }}
      />

    
   <MainStack.Screen
  name="accountSettings"
  component={AccountSettings}
  options={{
    title: Strings.navbar_title.accountSettings,

    // Center the title
    headerTitleAlign: 'center',

    // Make back arrow white
    headerTintColor: '#FFF',

    // Optional: make title white too
    headerTitleStyle: {
      color: '#FFF',
    },

    
  }}
/>
      <MainStack.Screen
        name="myProfile"
        component={MyProfile}
        options={{ title: Strings.navbar_title.myProfile }}
      />
      <MainStack.Screen
        name="support"
        component={Support}
        options={{ title: Strings.navbar_title.support,
    // Center the title
    headerTitleAlign: 'center',

    // Make back arrow white
    headerTintColor: '#FFF',

    // Optional: make title white too
    headerTitleStyle: {
      color: '#FFF',
    }, }}
      />
      <MainStack.Screen
        name="changePassword"
        component={ChangePwd}
        options={{
          title: Strings.navbar_title.changePassword,
          headerStyle: styles.header,
          headerLeft: () => <BackButton tintColor={Colors.navbar.iconTintSecondary} />,
        }}
      />
      <MainStack.Screen
        name="changePhone"
        component={ChangePhone}
        options={{
          title: Strings.navbar_title.changePhone,
          headerStyle: styles.header,
          headerLeft: () => <BackButton tintColor={Colors.navbar.iconTintSecondary} />,
        }}
      />
      <MainStack.Screen
        name="verificationMain"
        component={Verification}
        options={{
          title: Strings.navbar_title.verification,
          headerStyle: styles.header,
          headerLeft: () => <BackButton tintColor={Colors.navbar.iconTintSecondary} />,
        }}
      />
      <MainStack.Screen
        name="rewards"
        component={Rewards}
        options={{ title: Strings.navbar_title.rewards }}
      />
      <MainStack.Screen
        name="notifications"
        component={Notifications}
        options={{ title: Strings.navbar_title.notifications }}
      />
      <MainStack.Screen
        name="editProfile"
        component={EditProfile}
        options={{ title: Strings.navbar_title.editProfile,
    // Center the title
    headerTitleAlign: 'center',

    // Make back arrow white
    headerTintColor: '#FFF',

    // Optional: make title white too
    headerTitleStyle: {
      color: '#FFF',
    }, }}
      />
      <MainStack.Screen
        name="interestedCampaigns"
        component={InterestedCampaigns}
        options={{ title: Strings.navbar_title.interestedCampaigns }}
      />
      <MainStack.Screen
        name="missedCampaigns"
        component={MissedCampaigns}
        options={{ title: Strings.navbar_title.missedCampaigns }}
      />
      <MainStack.Screen
        name="newlyAdded"
        component={NewlyAdded}
        options={{ title: Strings.navbar_title.newlyAdded }}
      />
      <MainStack.Screen
        name="participated"
        component={Participated}
        options={{ title: Strings.navbar_title.participated }}
      />
      <MainStack.Screen
        name="filter"
        component={Filter}
        options={{ title: Strings.navbar_title.filter,
    // Center the title
    headerTitleAlign: 'center',

    // Make back arrow white
    headerTintColor: '#FFF',

    // Optional: make title white too
    headerTitleStyle: {
      color: '#FFF',
    }, }}
      />
      <MainStack.Screen
        name="leaderBoard"
        component={LeaderBoard}
        options={{ title: Strings.navbar_title.leaderBoard ,

    // Center the title
    headerTitleAlign: 'center',

    // Make back arrow white
    headerTintColor: '#FFF',

    // Optional: make title white too
    headerTitleStyle: {
      color: '#FFF',
    },}}
      />

      {/* Campaign Detail - replicate onEnter/onExit */}
      <MainStack.Screen
        name="campaignDetail"
        component={CampaignDetail}
        options={{ headerShown: false, title: Strings.navbar_title.campaignDetail }}
        listeners={{
          focus: () => {
            if (Utils.isPlatformAndroid()) {
              setTimeout(() => {
                // if you want to enable translucent/android behavior, uncomment below
                // StatusBar.setTranslucent(true);
                // StatusBar.setBackgroundColor(Colors.transparent);
              }, 200);
            } else {
              StatusBar.setBarStyle('light-content');
            }
          },
          blur: () => {
            if (Utils.isPlatformAndroid()) {
              setTimeout(() => {
                // StatusBar.setTranslucent(false);
                // StatusBar.setBackgroundColor(Colors.navbar.background2);
              }, 200);
            } else {
              StatusBar.setBarStyle('dark-content');
            }
          },
        }}
      />

      <MainStack.Screen
        name="searchedCampaigns"
        component={SearchedCampaigns}
        options={{ title: Strings.navbar_title.searchedCampaigns,
    // Center the title
    headerTitleAlign: 'center',

    // Make back arrow white
    headerTintColor: '#FFF',

    // Optional: make title white too
    headerTitleStyle: {
      color: '#FFF',
    }, }}
      />
      <MainStack.Screen
        name="filterCampaigns"
        component={FilteredCampaigns}
        options={{ title: Strings.navbar_title.filteredCampaigns,
    // Center the title
    headerTitleAlign: 'center',

    // Make back arrow white
    headerTintColor: '#FFF',

    // Optional: make title white too
    headerTitleStyle: {
      color: '#FFF',
    }, }}
      />

      {/* Game view - block gestures and hide status bar */}
      <MainStack.Screen
        name="gameView"
        component={GameView}
        options={{
          title: Strings.navbar_title.gameView,
          headerShown: false,
          gestureEnabled: false,
        }}
        // listeners={{
        //   focus: () => {
        //     // StatusBar.setHidden(true);
        //   },
        //   blur: () => {
        //     StatusBar.setHidden(false);
        //   },
        // }}
      />

      <MainStack.Screen
        name="webView"
        component={WebView}
        options={{ title: Strings.navbar_title.filteredCampaigns,
    // Center the title
    headerTitleAlign: 'center',

    // Make back arrow white
    headerTintColor: '#FFF',

    // Optional: make title white too
    headerTitleStyle: {
      color: '#FFF',
    }, }}
      />
      <MainStack.Screen
        name="campaignComments"
        component={CampaignComments}
        options={{ title: Strings.navbar_title.comments }}
      />
      <MainStack.Screen
        name="searchUsers"
        component={SearchUsers}
        options={{ title: Strings.navbar_title.search_people }}
      />
      <MainStack.Screen
        name="invite"
        component={Invite}
        options={{ title: Strings.navbar_title.invite_friends }}
      />

      {/* Reward detail - replicate onEnter/onExit */}
      <MainStack.Screen
        name="rewardDetail"
        component={RewardDetail}
        options={{ headerShown: false, title: Strings.navbar_title.rewardDetail }}
        listeners={{
          focus: () => {
            if (Utils.isPlatformAndroid()) {
              setTimeout(() => {
                // StatusBar.setTranslucent(true);
                // StatusBar.setBackgroundColor(Colors.transparent);
              }, 200);
            } else {
              StatusBar.setBarStyle('light-content');
            }
          },
          blur: () => {
            if (Utils.isPlatformAndroid()) {
              setTimeout(() => {
                // StatusBar.setTranslucent(false);
                // StatusBar.setBackgroundColor(Colors.navbar.background2);
              }, 200);
            } else {
              StatusBar.setBarStyle('dark-content');
            }
          },
        }}
      />
    </MainStack.Navigator>
  );
}

// ----------------- Root stack: contains BOTH loginNavigator and mainNavigator (order dependent on isLoggedIn) -----------------
export default () => {
  // apply android back handler
  // useAndroidBackHandler();

  // determine initial route name based on DataHandler.isLoggedIn()
  const initial = DataHandler.isLoggedIn() ? 'MainRoot' : 'AuthRoot';
  console.log("initial",initial);
  

  // Provide the root navigator that contains both Auth and Main, but initial route matches your original ordering
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        initialRouteName={initial}
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <RootStack.Screen name="AuthRoot" component={LoginNavigator} />
        <RootStack.Screen name="MainRoot" component={MainNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

// import React, {useRef} from 'react';
// import {connect} from 'react-redux';
// import {
//   Stack,
//   Scene,
//   Router,
//   Actions,
//   ActionConst,
//   Drawer,
//   Tabs,
// } from 'react-native-router-flux';
// import {View, StatusBar, Image, Platform, Text} from 'react-native';
// import {BackButton, TabIcon} from '../components';

// import {
//   LoginSelection,
//   Login,
//   SignUp,
//   ForgotPwd,
//   Verification,
//   NewPassword,
//   Home,
//   ChangePwd,
//   ChangePhone,
//   MyProfile,
//   AccountSettings,
//   Support,
//   Rewards,
//   Notifications,
//   EditProfile,
//   InterestedCampaigns,
//   MissedCampaigns,
//   NewlyAdded,
//   Participated,
//   Filter,
//   LeaderBoard,
//   CampaignDetail,
//   SearchedCampaigns,
//   FilteredCampaigns,
//   SocialSignUp,
//   GameView,
//   WebView,
//   CampaignComments,
//   SearchUsers,
//   Invite,
//   RewardDetail,
// } from '../containers';

// import {TransitionPresets} from '@react-navigation/stack';

// import DataHandler from '../services/DataHandler';
// import Utils from '../utils';
// import styles from './styles';
// import {Strings, Colors, Metrics, Images} from '../theme';
// const screens = ['gameView'];

// function onBackPress() {
//   if (screens.includes(Actions.currentScene)) {
//     return true; // means handled
//   }
//   return false; // default system handling
//   // if (Actions.state.index === 0) {
//   //   return false;
//   // }
//   // Actions.pop();
//   // return true;
// }

// // <Drawer
// //hideNavBar
// //type={ActionConst.RESET}
// //contentComponent={MyProfile}
// //drawerIcon={() => <View />}
// //drawerOpenRoute="DrawerOpen"
// //drawerCloseRoute="DrawerClose"
// //drawerToggleRoute="DrawerToggle"
// //drawerWidth={Metrics.screenWidth * 0.85}
// //>

// // <Stack tabs hideNavBar tabBarStyle={styles.tabBarStyle} showLabel={false}>
// //   <Scene
// //     key="home"
// //     component={Home}
// //     hideNavBar
// //     title="home"
// //     icon={TabIcon}
// //   />
// //   {/* <Scene
// //     key="camera"
// //     component={() => <View />}
// //     tabBarOnPress={() => alert("hi")}
// //     title="camera"
// //     icon={TabIcon}
// //   /> */}
// //   <Scene
// //     key="notifications"
// //     component={Notifications}
// //     title={Strings.navbar_title.notifications}
// //     icon={TabIcon}
// //   />
// //   <Scene
// //     hideNavBar
// //     key="myProfile"
// //     component={MyProfile}
// //     title={Strings.navbar_title.myProfile}
// //     icon={TabIcon}
// //   />
// // </Stack>
// // </Drawer>

// const loginNavigator = () => (
//   <Stack
//     key="loginNavigator"
//     navigationBarStyle={styles.header}
//     type={ActionConst.RESET}
//     {...TransitionPresets.SlideFromRightIOS}
//     renderBackButton={() => <BackButton />}>
//     <Scene key="loginSelection" component={LoginSelection} hideNavBar />
//     <Scene key="login" component={Login} />
//     <Scene key="signUp" component={SignUp} />
//     <Scene key="forgotPwd" component={ForgotPwd} />
//     <Scene key="socialSignUp" component={SocialSignUp} />
//     <Scene key="verification" component={Verification} />
//     <Scene key="newPassword" component={NewPassword} />
//   </Stack>
// );

// const mainNavigator = () => (
//   <Stack
//     key="mainNavigator"
//     titleStyle={Utils.isPlatformAndroid() ? styles.titleCenter : styles.title}
//     navigationBarStyle={[
//       styles.header,
//       {
//         backgroundColor: Colors.navbar.background2,
//       },
//     ]}
//     type={ActionConst.RESET}
//     renderBackButton={() => (
//       <BackButton tintColor={Colors.navbar.iconTintPrimary} />
//     )}
//     {...TransitionPresets.SlideFromRightIOS}>
//     {/* Tabs start */}
//     <Drawer
//       key={'drawer'}
//       hideNavBar
//       contentComponent={MyProfile}
//       drawerIcon={() => (
//         <Image
//           style={
//             Platform.OS === 'android'
//               ? {marginLeft: 12}
//               : {marginLeft: 12, bottom: 3}
//           }
//           source={Images.tabs.myprofile}
//         />
//       )}
//       drawerOpenRoute="DrawerOpen"
//       drawerCloseRoute="DrawerClose"
//       drawerToggleRoute="DrawerToggle"
//       drawerWidth={Metrics.screenWidth * 0.85}>
//       <Stack
//         tabs={true}
//         key="mainNavigatorTabs"
//         // hideNavBar
//         tabBarStyle={styles.tabBarStyle}
//         showLabel={false}>
//         <Scene
//           key="home"
//           component={Home}
//           hideNavBar
//           title="home"
//           icon={TabIcon}
//         />
//         <Scene
//           key="notifications"
//           component={Notifications}
//           title={Strings.navbar_title.notifications}
//           // hideNavBar
//           rightButtonImage={() => {}}
//           icon={TabIcon}
//           titleStyle={
//             Utils.isPlatformAndroid() ? styles.titleCenter : styles.title
//           }
//           onEnter={() => Utils.resetNotificationCount()}
//         />
//         {/* <Scene
//           hideNavBar
//           key="myProfile"
//           component={MyProfile}
//           title={Strings.navbar_title.myProfile}
//           icon={TabIcon}
//         /> */}
//         <Scene
//           key="rewards"
//           component={Rewards}
//           title={Strings.navbar_title.rewards}
//           icon={TabIcon}
//           rightButtonImage={() => {}}
//           titleStyle={
            // Utils.isPlatformAndroid() ? styles.titleCenter : styles.title
//           }
//         />
//       </Stack>
//     </Drawer>
//     {/* Tabs end */}
//     <Scene
//       key="accountSettings"
//       component={AccountSettings}
//       title={Strings.navbar_title.accountSettings}
//     />
//     <Scene
//       key="myProfile"
//       component={MyProfile}
//       title={Strings.navbar_title.myProfile}
//     />
//     <Scene
//       key="support"
//       component={Support}
//       title={Strings.navbar_title.support}
//     />
//     <Scene
//       key="changePassword"
//       component={ChangePwd}
//       navigationBarStyle={styles.header}
//       renderBackButton={() => (
//         <BackButton tintColor={Colors.navbar.iconTintSecondary} />
//       )}
//     />
//     <Scene
//       key="changePhone"
//       component={ChangePhone}
//       navigationBarStyle={styles.header}
//       renderBackButton={() => (
//         <BackButton tintColor={Colors.navbar.iconTintSecondary} />
//       )}
//     />
//     <Scene
//       key="verificationMain"
//       component={Verification}
//       navigationBarStyle={styles.header}
//       renderBackButton={() => (
//         <BackButton tintColor={Colors.navbar.iconTintSecondary} />
//       )}
//     />
//     <Scene
//       key="rewards"
//       component={Rewards}
//       title={Strings.navbar_title.rewards}
//     />
//     <Scene
//       key="notifications"
//       component={Notifications}
//       title={Strings.navbar_title.notifications}
//     />
//     <Scene
//       key="editProfile"
//       component={EditProfile}
//       title={Strings.navbar_title.editProfile}
//     />
//     <Scene
//       key="interestedCampaigns"
//       component={InterestedCampaigns}
//       title={Strings.navbar_title.interestedCampaigns}
//     />
//     <Scene
//       key="missedCampaigns"
//       component={MissedCampaigns}
//       title={Strings.navbar_title.missedCampaigns}
//     />
//     <Scene
//       key="newlyAdded"
//       component={NewlyAdded}
//       title={Strings.navbar_title.newlyAdded}
//     />
//     <Scene
//       key="participated"
//       component={Participated}
//       title={Strings.navbar_title.participated}
//     />
//     <Scene
//       key="filter"
//       component={Filter}
//       title={Strings.navbar_title.filter}
//     />
//     <Scene
//       key="leaderBoard"
//       component={LeaderBoard}
//       title={Strings.navbar_title.leaderBoard}
//     />
//     <Scene
//       key="campaignDetail"
//       component={CampaignDetail}
//       hideNavBar
//       onEnter={() => {
//         if (Utils.isPlatformAndroid()) {
//           setTimeout(() => {
//             // StatusBar.setTranslucent(true);
//             //StatusBar.setBackgroundColor(Colors.transparent);
//           }, 200);
//         } else {
//           StatusBar.setBarStyle('light-content');
//         }
//       }}
//       onExit={() => {
//         if (Utils.isPlatformAndroid()) {
//           setTimeout(() => {
//             // StatusBar.setTranslucent(false);
//             // StatusBar.setBackgroundColor(Colors.navbar.background2);
//           }, 200);
//         } else {
//           StatusBar.setBarStyle('dark-content');
//         }
//       }}
//       title={Strings.navbar_title.campaignDetail}
//     />
//     <Scene
//       key="searchedCampaigns"
//       component={SearchedCampaigns}
//       title={Strings.navbar_title.searchedCampaigns}
//     />
//     <Scene
//       key="filterCampaigns"
//       component={FilteredCampaigns}
//       title={Strings.navbar_title.filteredCampaigns}
//     />
//     <Scene
//       key="gameView"
//       component={GameView}
//       title={Strings.navbar_title.gameView}
//       hideNavBar
//       panHandlers={null}
//       gesturesEnabled={false}
//       onEnter={() => {
//         StatusBar.setHidden(true);
//       }}
//       onExit={() => {
//         StatusBar.setHidden(false);
//       }}
//     />
//     <Scene
//       key="webView"
//       component={WebView}
//       title={Strings.navbar_title.filteredCampaigns}
//     />
//     <Scene
//       key="campaignComments"
//       component={CampaignComments}
//       title={Strings.navbar_title.comments}
//     />
//     <Scene
//       key="searchUsers"
//       component={SearchUsers}
//       title={Strings.navbar_title.search_people}
//     />
//     <Scene
//       key="invite"
//       component={Invite}
//       title={Strings.navbar_title.invite_friends}
//     />
//     <Scene
//       key="rewardDetail"
//       component={RewardDetail}
//       hideNavBar
//       onEnter={() => {
//         if (Utils.isPlatformAndroid()) {
//           setTimeout(() => {
//             // StatusBar.setTranslucent(true);
//             //StatusBar.setBackgroundColor(Colors.transparent);
//           }, 200);
//         } else {
//           StatusBar.setBarStyle('light-content');
//         }
//       }}
//       onExit={() => {
//         if (Utils.isPlatformAndroid()) {
//           setTimeout(() => {
//             // StatusBar.setTranslucent(false);
//             // StatusBar.setBackgroundColor(Colors.navbar.background2);
//           }, 200);
//         } else {
//           StatusBar.setBarStyle('dark-content');
//         }
//       }}
//       title={Strings.navbar_title.rewardDetail}
//     />
//   </Stack>
// );

// let navigator = Actions.create(
//   <Stack
//     key="root"
//     hideNavBar
//     titleStyle={styles.title}
//     rightButtonImage={() => {}}
//     backTitle=" "
//     {...TransitionPresets.SlideFromRightIOS}>
//     {loginNavigator()}
//     {mainNavigator()}
//   </Stack>,
// );

// export default () => {
//   if (DataHandler.isLoggedIn()) {
//     navigator = Actions.create(
//       <Stack
//         key="root"
//         hideNavBar
//         titleStyle={styles.title}
//         rightButtonImage={() => {}}
//         backTitle=" "
//         {...TransitionPresets.SlideFromRightIOS}>
//         {mainNavigator()}
//         {loginNavigator()}
//       </Stack>,
//     );
//   }

//   const AppNavigator = connect()(Router);

//   return (
//     <AppNavigator
//       navigator={navigator}
//       backAndroidHandler={onBackPress}
//       // uriPrefix={Utils.isPlatformIOS() ? "hictic://" : "hictic://share"}
//       // onDeepLink={data => {
//       //   setTimeout(() => {
//       //     alert("Hi");
//       //   }, 10000);
//       //   // Utils.deepLinkNavigation(data);
//       // }}
//     />
//   );
// };
