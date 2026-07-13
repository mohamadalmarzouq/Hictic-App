import React from 'react';
import {
  Platform,
  View,
  StatusBar,
  Linking,
  Image,
  ImageBackground,
  LogBox,
  Text,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import KeyboardManager from 'react-native-keyboard-manager';
import {MessageBar} from './components';
import {Provider} from 'react-redux';

import AppNavigator from './navigator';
import configureStore from './store';
import NetworkInfo from './services/NetworkInfo';
import networkInfoListener from './actions/NetworkInfoActions';
import DataHandler from './services/DataHandler';
import FirebaseUtils from './utils/FirebaseUtils';
import {Colors, Images, Metrics} from './theme';
import Utils from './utils';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const reducers = require('./reducers').default;

export default class App extends React.Component {
  componentWillMount() {
    if (Utils.isPlatformIOS()) {
      KeyboardManager.setToolbarPreviousNextButtonEnable(true);
    }
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     isLoading: true,
  //     store: configureStore(reducers, () => {
  //       const {user} = this.state.store.getState();
  //       const isUserLoggedIn = user.data && user.data.id;
  //       DataHandler.setLogin(isUserLoggedIn);
  //       DataHandler.setStore(this.state.store);

  //       // SplashScreen.hide();
  //       setTimeout(() => {
  //         this.setState(
  //           {
  //             isLoading: false,
  //             isUserLoggedIn: isUserLoggedIn,
  //           },
  //           () => {},
  //         );
  //       }, 3000);
  //     }),
  //   };
  // }
//   constructor(props) {
//   super(props);
//   this.state = {
//     isLoading: true,
//     store: null,
//   };

//   configureStore((store) => {
//     // Initialize DataHandler and user state
  
    
//     const { user } = store.getState();
//     const isUserLoggedIn = user.data && user.data.id;

//     DataHandler.setLogin(isUserLoggedIn);
//     DataHandler.setStore(store);

//     // Update state with store and login status
//     this.setState(
//       {
//         isLoading: false,
//         store,
//         isUserLoggedIn: isUserLoggedIn,
//       },
//       () => {
//         // Hide splash screen after a delay
//         setTimeout(() => {
//           // SplashScreen.hide();
//         }, 3000);
//       }
//     );
//   });
// }
 constructor(props) {
  super(props);
  this.state = {
    isLoading: true,
    store: null,
  };

  configureStore((store) => {
    // Initialize DataHandler and user state
    const { user } = store.getState();
    const isUserLoggedIn = user.data && user.data.id;

    DataHandler.setLogin(isUserLoggedIn);
    DataHandler.setStore(store);

    // SplashScreen.hide();
          setTimeout(() => {
            // SplashScreen.hide();
          this.setState(
            {
              isLoading: false,
              store,
              isUserLoggedIn: isUserLoggedIn,
         },
           () => {},
          );
        }, 3000);
  });
}



  linkingListener = null;
  

  componentDidMount() {
    //  if (Platform.OS === 'ios') {
    SplashScreen.hide();
  // }
    FirebaseUtils.getPermissionAndroid13Above();
    FirebaseUtils.FCMListener();
    FirebaseUtils.getPermission();
    //  requestPermission();
    // NetworkInfo.networkInfoListener(
    //   this.state.store.dispatch,
    //   networkInfoListener,
    // );
    if (this.state.store) {
      NetworkInfo.networkInfoListener(
      this.state.store.dispatch,
      networkInfoListener,
    );
    }
    // deep linking setup
    Linking.getInitialURL().then(url => {
      this.navigate(url);
    });
    if (Platform.OS === 'ios') {
      this.linkingListener = Linking.addEventListener(
        'url',
        this.handleOpenURL,
      );
    }
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      });
    } else {
      this.linkingListener = Linking.addEventListener(
        'url',
        this.handleOpenURL,
      );
    }
    StatusBar.setBackgroundColor(Colors.navbar.background2);
  }

  // componentWillUnmount() {
  //   // NetworkInfo.removeNetworkInfoListener(
  //   //   this.state.store.dispatch,
  //   //   networkInfoListener,
  //   // );
  //   // // remove deep linking listener
  //   if (Platform.OS === 'ios') {
  //     this.linkingListener?.remove();
  //   }
  // }
  componentWillUnmount() {
  if (this.state.store) {
    NetworkInfo.removeNetworkInfoListener(this.state.store.dispatch, networkInfoListener);
  }

  if (Platform.OS === 'ios') {
    this.linkingListener?.remove();
  }
}

  handleOpenURL = event => {
    this.navigate(event.url);
  };

  navigate = url => {
    const {isUserLoggedIn} = this.state;
    if (isUserLoggedIn && url) {
      const route = url.replace(/.*?:\/\//g, '');
      const id = route.match(/\/([^\/]+)\/?$/)[1];
      const routeName = route.split('share/')[1].split('/')[0];
      Utils.handleDeepLinkClick(routeName, id);
    }
  };

  _renderGifView = () => {
    return (
      <ImageBackground
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
        source={Images.splash}>
        <Image
          source={Images.gifs.loader}
          style={{width: Metrics.screenWidth, height: Metrics.screenHeight}}
          resizeMode="contain"
        />
      </ImageBackground>
    );
  };

// _renderGifView = () => {
//   return (
//     <ImageBackground
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//       source={Images.splash} // static background image
//     >
//       <FastImage
//         source={Images.gifs.loader} // animated GIF
//         style={{ width: Metrics.screenWidth, height: Metrics.screenHeight }}
//         resizeMode={FastImage.resizeMode.contain}
//       />
//     </ImageBackground>
//   );
// };

  render() {
    LogBox.ignoreAllLogs();
    if (this.state.isLoading) {
      return this._renderGifView();
    }

    return (
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <View style={{flex: 1}}>
            <Provider store={this.state.store}>
              <AppNavigator />
            </Provider>
            <MessageBar />
          </View>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }
}
