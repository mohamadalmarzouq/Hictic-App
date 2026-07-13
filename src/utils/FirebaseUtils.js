import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';
import {PermissionsAndroid, Platform} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { navigationRef, navNavigate } from '../navigator';
import { CommonActions } from '@react-navigation/native';

// Get Device Firebase Token
const getTokenPromise = async () => {
  await messaging().registerDeviceForRemoteMessages();

  return new Promise((resolve, reject) => {
    messaging()
      .getToken()
      .then(token => {
        resolve(token);
        console.log('DEVICE TOKEN', token);
      })
      .catch(error => {
        console.log('Token Error -->', error);
        resolve('');
      });
  });
};
// const getTokenPromise = async () => {
//   try {
//     // 1️⃣ On iOS, request notification permission
//     if (Platform.OS === 'ios') {
//       const authStatus = await messaging().requestPermission();
//       const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//       if (!enabled) {
//         console.log('Push notification permission denied');
//         return '';
//       }
//     }

//     // 2️⃣ Register device for remote messages (required before getToken)
//     await messaging().registerDeviceForRemoteMessages();

//     // 3️⃣ Get the FCM token
//     const token = await messaging().getToken();
//     console.log('FCM Device Token:', token);

//     return token;
//   } catch (error) {
//     console.log('FCM Token Error -->', error);
//     return '';
//   }
// };

/**
 * Listen for token refresh (important for both iOS & Android)
 */
export const listenForTokenRefresh = () => {
  return messaging().onTokenRefresh(newToken => {
    console.log('FCM Token refreshed:', newToken);
    // Save or send to backend
  });
};

const getPermission = async () => {
  console.log("here in permission");
  const authorizationStatus = await messaging().requestPermission();
  const enabled =
    authorizationStatus !== messaging.AuthorizationStatus.AUTHORIZED ||
    authorizationStatus !== messaging.AuthorizationStatus.PROVISIONAL;
console.log("enabled",enabled);

  return enabled;
};

const getPermissionAndroid13Above = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    console.log("here in permission 12 above");
    
    const permission = 'android.permission.POST_NOTIFICATIONS';
    try {
      const granted = await PermissionsAndroid.request(permission);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    } catch (err) {
      console.warn('Permission error:', err);
    }
  }
};

// Create Channel For Android
const createChannel = () => {
  if (Platform.OS === 'android') {
    PushNotification.channelExists('HicTic', exists => {
      if (!exists) {
        PushNotification.createChannel({
          channelId: 'HicTic', // (required) to be used by server for channel identification
          channelName: 'HicTic Notifications', // (required) shown in default OS notification settings
          importance: Importance.HIGH, //(optional) default: 4. Int value of the Android notification importance
          playSound: false, // (optional) default: true
          soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
          vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        });
      }
    });
  }
};

// Local Notification object
const localNotification = ({title, message, data}) => {
  PushNotification.localNotification({
    channelId: 'HicTic',
    autoCancel: true,
    // largeIcon: 'ic_launcher',
    smallIcon: 'notification_icon',
    vibrate: true,
    vibration: 300,
    priority: 'high',
    ignoreInForeground: false,
    onlyAlertOnce: true,
    title: title,
    message: message,
    playSound: false,
    soundName: 'default',
    invokeApp: true,
    userInfo: data,
  });
};

// Configure Local Notification
const configure = () => {
  PushNotification.configure({
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },

    onNotification: function (notification) {
      console.log('NOTIFICATIONS =>', notification);
      if (notification.userInteraction) {
        notificationHandler(notification);
      }
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    onRegistrationError: function (error) {
      console.log('ERROR NOTIFICATIONS =>', error.message);
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
};

//Triggered when notification is Received - Firebase listener
messaging().onMessage(data => {
  // console.log('On Notification Received Foreground', data);
  console.log('NOTIFICATION FOREGROUND ----', data);
  setTimeout(() => {
    showLocalNotification(
      data?.notification.title,
      data?.notification?.body,
      data?.data,
    );
  }, 100);
  // notificationHandler(data);
});

// messaging().onMessage(({data, notification}) => {
//   console.log('On Notification Received Foreground', data);
//   localNotification({
//     ...data.notification,
//     message: data.notification.body,
//     data: data.data,
//   });
//   // showLocalNotification(notification.title, notification.body, data);
// });

messaging().onNotificationOpenedApp(remoteMessage => {
  console.log('onNotificationOpenedApp', remoteMessage);
  // if (notification.userInteraction) {
  //   notificationHandler(notification);
  // }
  notificationHandler(remoteMessage);
});

// --------------------------------------- //
// Notification Handler //
// Needs to customized as per Application requirements //
// --------------------------------------- //

// const notificationHandler = (notification, appClosed) => {
//   const data = notification.data ?? {};

//   if (appClosed) {
//     // updateResetCount(data.notification_count);
//   }

//   console.log('handleNotification', data);

//   switch (data.identifier) {
//     case 'add_campaign':
//     case 'start_campaign':
//     case 'end_campaign':
//       // if (Actions.currentScene === 'campaignDetail') {
//       //   Actions.replace('campaignDetail', {campaign_id: data.ref_id});
//       const route = navigationRef.getCurrentRoute();

// if (route?.name === 'campaignDetail') {
//   navigationRef.dispatch(
//     CommonActions.replace('campaignDetail', {
//       campaign_id: data.ref_id,
//     })
//   );

//       } else {
//         // Actions.campaignDetail({campaign_id: data.ref_id});
//         navNavigate("campaignDetail",{campaign_id: data.ref_id})
//       }

//       break;

//     case 'reward_winner':
//       // if (Actions.currentScene === 'rewards') {
//       //   Actions.replace('rewards');
//       // }
//       const route = navigationRef.getCurrentRoute();
//       if (route?.name === 'rewards') {
//   navigationRef.dispatch(
//     CommonActions.replace('rewards')
//   );

//       }
//       else {
//         // Actions.rewards();
//         navNavigate("rewards")
//       }

//       break;

//     case 'winner_announced':
//       if (Actions.currentScene === 'winner_announced') {
//         Actions.replace('winner_announced', {campaign_id: data.ref_id});
//       } else {
//         Actions.leaderBoard({campaign_id: data.ref_id});
//       }

//       break;

//     case 'coupon_shared':
//       if (Actions.currentScene === 'rewardDetail') {
//         Actions.replace('rewardDetail', {coupon_id: data.ref_id});
//       } else {
//         Actions.rewardDetail({coupon_id: data.ref_id});
//       }

//       break;
//   }
// };


const notificationHandler = (notification, appClosed) => {
  const data = notification.data ?? {};

  if (appClosed) {
    // updateResetCount(data.notification_count);
  }

  console.log('handleNotification', data);

  switch (data.identifier) {

    // -----------------------------
    // 🎯 CAMPAIGN RELATED
    // -----------------------------
    case 'add_campaign':
    case 'start_campaign':
    case 'end_campaign': {
      // OLD RNRF CODE
      // if (Actions.currentScene === 'campaignDetail') {
      //   Actions.replace('campaignDetail', {campaign_id: data.ref_id});
      // } else {
      //   Actions.campaignDetail({campaign_id: data.ref_id});
      // }

      const route = navigationRef.getCurrentRoute();

      if (route?.name === 'campaignDetail') {
        navigationRef.dispatch(
          CommonActions.replace("campaignDetail", {
            campaign_id: data.ref_id,
          }),
        );
      } else {
        navNavigate("campaignDetail", { campaign_id: data.ref_id });
      }
      break;
    }

    // -----------------------------
    // 🏆 REWARD WINNER
    // -----------------------------
    case 'reward_winner': {
      // OLD RNRF CODE
      // if (Actions.currentScene === 'rewards') {
      //   Actions.replace('rewards');
      // } else {
      //   Actions.rewards();
      // }

      const route = navigationRef.getCurrentRoute();

      if (route?.name === 'rewards') {
        navigationRef.dispatch(
          CommonActions.replace("rewards")
        );
      } else {
        navNavigate("rewards");
      }
      break;
    }

    // -----------------------------
    // 🥇 WINNER ANNOUNCED
    // -----------------------------
    case 'winner_announced': {
      // OLD RNRF CODE
      // if (Actions.currentScene === 'winner_announced') {
      //   Actions.replace('winner_announced', {campaign_id: data.ref_id});
      // } else {
      //   Actions.leaderBoard({campaign_id: data.ref_id});
      // }

      const route = navigationRef.getCurrentRoute();

      if (route?.name === 'winner_announced') {
        navigationRef.dispatch(
          CommonActions.replace('winner_announced', {
            campaign_id: data.ref_id,
          })
        );
      } else {
        navNavigate("leaderBoard", { campaign_id: data.ref_id });
      }
      break;
    }

    // -----------------------------
    // 🎫 COUPON SHARED
    // -----------------------------
    case 'coupon_shared': {
      // OLD RNRF CODE
      // if (Actions.currentScene === 'rewardDetail') {
      //   Actions.replace('rewardDetail', {coupon_id: data.ref_id});
      // } else {
      //   Actions.rewardDetail({coupon_id: data.ref_id});
      // }

      const route = navigationRef.getCurrentRoute();

      if (route?.name === 'rewardDetail') {
        navigationRef.dispatch(
          CommonActions.replace("rewardDetail", {
            coupon_id: data.ref_id,
          })
        );
      } else {
        navNavigate("rewardDetail", { coupon_id: data.ref_id });
      }
      break;
    }
  }
};


const FCMListener = () => {
  createChannel();
  configure();
  getTokenPromise();
};

const showLocalNotification = (title, message, userInfo) =>
  PushNotification.localNotification({
    channelId: 'HicTic',
    autoCancel: true,
    // largeIcon: 'ic_launcher',
    smallIcon: 'notification_icon',
    vibrate: true,
    vibration: 300,
    priority: 'high',
    ignoreInForeground: false,
    onlyAlertOnce: false,
    title,
    message,
    playSound: true,
    soundName: 'default',
    invokeApp: true,
    userInfo,
  });

export default {
  FCMListener,
  localNotification,
  getTokenPromise,
  getPermission,
  showLocalNotification,
  getPermissionAndroid13Above,
};

// import {Platform, PermissionsAndroid} from 'react-native';
// import {Actions} from 'react-native-router-flux';
// import {generalDispatchType} from '../actions/GeneralAction';
// import {NOTIFICATION_COUNT_ADD} from '../actions/ActionTypes';

// export async function getPermissionAndroid13Above() {
//   if (Platform.OS === 'android' && Platform.Version >= 33) {
//     const permission = 'android.permission.POST_NOTIFICATIONS';
//     try {
//       const granted = await PermissionsAndroid.request(permission);
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('Notification permission granted');
//       } else {
//         console.log('Notification permission denied');
//       }
//     } catch (err) {
//       console.warn('Permission error:', err);
//     }
//   }
// }

// export function registerFCMListener(store) {
//   const chanelId = 'hictic';

//   /* Notification came when app is in foreground */
//   firebase.notifications().onNotification(notification => {
//     console.log('onNotification', notification);

//     const localNotification = new firebase.notifications.Notification()
//       .setNotificationId(notification.notificationId)
//       .setTitle(notification.title)
//       .setBody(notification.body)
//       .setData(notification.data)
//       .setSound('default');

//     localNotification.ios = notification.ios;
//     localNotification.android = notification.android;

//     // android specific
//     if (Platform.OS === 'android') {
//       //Build a channel (android specific)
//       const channel = new firebase.notifications.Android.Channel(
//         chanelId,
//         'hicticChannel',
//         firebase.notifications.Android.Importance.Max,
//       ).setDescription('HicTic channel');

//       //Create the channel (android specific)
//       firebase.notifications().android.createChannel(channel);

//       localNotification.android.setChannelId(chanelId);
//       localNotification.android.setAutoCancel(true);
//       localNotification.android.setSmallIcon('notification_icon'); // name of the icon placed in android drawable or file name or url
//       localNotification.android.setColor(Colors.accent);

//       // updateResetCount(data.notification_count);
//     } else {
//       localNotification.ios.setBadge(notification.ios.badge);
//     }

//     // update counter
//     if (Actions.currentScene !== 'notifications') {
//       store.dispatch(generalDispatchType(NOTIFICATION_COUNT_ADD));
//     }

//     firebase
//       .notifications()
//       .displayNotification(localNotification)
//       .catch(err => {
//         console.log('displayNotification err', err);
//       });
//   });

//   /* Notification is tapped/opened in when app is in foreground or background */
//   firebase
//     .notifications()
//     .onNotificationOpened((notificationOpen: NotificationOpen) => {
//       console.log('onNotificationOpened', notificationOpen);
//       handleNotification(notificationOpen.notification, false);
//     });

//   /* App is closed, and opened by notification */
//   firebase
//     .notifications()
//     .getInitialNotification()
//     .then((notificationOpen: NotificationOpen) => {
//       if (notificationOpen) {
//         console.log('getInitialNotification', notificationOpen);
//         handleNotification(notificationOpen.notification, true);
//       }
//     });
// }

// function handleNotification(notification: Notification, appClosed) {
//   const {data} = notification;

//   if (appClosed) {
//     // updateResetCount(data.notification_count);
//   }

//   console.log('handleNotification', data);

//   switch (data.identifier) {
//     case 'add_campaign':
//     case 'start_campaign':
//     case 'end_campaign':
//       if (Actions.currentScene === 'campaignDetail') {
//         Actions.replace('campaignDetail', {campaign_id: data.ref_id});
//       } else {
//         Actions.campaignDetail({campaign_id: data.ref_id});
//       }

//       break;

//     case 'reward_winner':
//       if (Actions.currentScene === 'rewards') {
//         Actions.replace('rewards');
//       } else {
//         Actions.rewards();
//       }

//       break;

//     case 'winner_announced':
//       if (Actions.currentScene === 'winner_announced') {
//         Actions.replace('winner_announced', {campaign_id: data.ref_id});
//       } else {
//         Actions.leaderBoard({campaign_id: data.ref_id});
//       }

//       break;

//     case 'coupon_shared':
//       if (Actions.currentScene === 'rewardDetail') {
//         Actions.replace('rewardDetail', {coupon_id: data.ref_id});
//       } else {
//         Actions.rewardDetail({coupon_id: data.ref_id});
//       }

//       break;
//   }
// }

// /* Get device token */
// export function getToken(cb) {
//   firebase
//     .messaging()
//     .getToken()
//     .then(token => {
//       if (cb) cb(token);
//     })
//     .catch(err => {
//       console.log('TOKEN err: ', err);
//     });
// }

// /* Get device token */
// export function getTokenPromise() {
//   return new Promise((resolve, reject) => {
//     firebase
//       .messaging()
//       .getToken()
//       .then(token => {
//         resolve(token || '');
//       })
//       .catch(err => {
//         resolve('');
//         //reject(err);
//       });
//   });
// }

// /* check notification permission */
// export function checkPermission() {
//   firebase
//     .messaging()
//     .hasPermission()
//     .then(enabled => {
//       console.log('checkPermission', enabled);
//       return enabled;
//     });
// }

// /* Request permission for notifications */
// export function requestPermission() {
//   firebase
//     .messaging()
//     .requestPermission()
//     .then(() => {
//       // User has authorised
//       console.log('requestPermission authorised');
//     })
//     .catch(error => {
//       // User has rejected permissions
//       console.log('requestPermission error', error);
//     });
// }

// export function removeNotificationTray() {
//   firebase.notifications().removeAllDeliveredNotifications();
// }
