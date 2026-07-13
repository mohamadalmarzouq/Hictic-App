import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  AppState,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ButtonView, Loading} from '../../components/';
import {Metrics, Colors, ApplicationStyles} from '../../theme';
import Utils from '../../utils';
import Draggables from './Draggable';
import {Images} from '../../theme';
import {WebView} from 'react-native-webview';
import { navPop } from '../../navigator';

export default class GameView extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      user_id,
      campaign_id,
      gameInfo,
      safeAreaTop,
      safeAreaBottom,
      baseUrl,
      ln,
    } = props.route.params;
    const {game_path} = gameInfo;

    const url =
      game_path +
      '?' +
      Utils.getQueryStrings({
        user_id,
        campaign_id,
        safeAreaTop,
        safeAreaBottom,
        baseUrl,
        ln,
      });

    console.log('Game', Utils.getImagePath(url));

    this.state = {
      gameUrl: Utils.getImagePath(url),
      loading: true,
      showWebView: false,
    };
  }

  appStateSubscription = null;

  componentDidMount() {
    this.appStateSubscription = AppState.addEventListener(
      'change',
      this._handleAppStateChange,
    );
    this.webview?.clearCache(true);
    setTimeout(() => {
      this.setState({showWebView: true});
    }, 500);
  }
  componentWillUnmount() {
    this.appStateSubscription?.remove();
  }

  _handleAppStateChange = currentAppState => {
    // this.webview.postMessage(
    //   currentAppState === "background" || "inactive" ? "pause" : "resume"
    // );

    // if (currentAppState === "active") {
    //   //   this.webview.postMessage("resume");
    //   this.webview.postMessage("pause");
    // }

    // this.webview.postMessage("pause");

    if (
      (Utils.isPlatformIOS() && currentAppState === 'inactive') ||
      (Utils.isPlatformAndroid() && currentAppState === 'background')
    ) {
      this.webview.postMessage('pause');
    } else if (currentAppState === 'active') {
      this.webview.postMessage('resume');
    }

    console.log('currentAppState', currentAppState);
  };

  _onExitPress = () => {
    const {callBack} = this.props.route.params;
    console.log("this.props.",this.props.route.params)
    console.log("this.props calllll",callBack)
    
    // if (callBack) callBack(false);
    // Actions.pop();
    // navPop()
  // this.props.navigation.goBack();
  };

  _onNavigationStateChanged = event => {
    const {gameUrl} = this.state;

    if (event.url !== gameUrl) {
      const keyword = event.url.split('#')[1];

      if (keyword) {
        switch (keyword) {
          case 'back':
            const {callBack} = this.props.route.params;
            if (callBack) callBack(false);
             console.log("this.props.route.params",this.props.route.params);
            this.webview.stopLoading();
            // Actions.pop();
            // navPop()
           this.props.navigation.goBack();
            break;
        }
      }
    }
  };

  renderImageLayer = () => {
    return (
      <ImageBackground
        style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
        source={Images.splash}
      />
    );
  };

  render() {
    const {user_id, campaign_id, gameInfo} = this.props.route.params;
    const {gameUrl, loading, showWebView} = this.state;
    console.log('url', gameUrl);
    return (
      <View style={ApplicationStyles.scrollContainer}>
        {showWebView && (
          <WebView
            incognito={true}
            style={ApplicationStyles.flex}
            cacheEnabled={false}
            source={{
              uri: gameUrl,
            }}
            ref={ref => {
              this.webview = ref;
            }}
            onNavigationStateChange={this._onNavigationStateChanged}
            onLoadEnd={() => {
              this.setState({loading: false});
            }}
          />
        )}

        {/*        <Text onPress={() => this.webview.postMessage("pause")}>Pause</Text>
        <Text onPress={() => this.webview.postMessage("resume")}>Resume</Text> */}

        {/* <Loading
          loading={loading}
          showNative={false}
          image={Images.gifs.loader}
          isTransparent
        /> */}

        {loading && this.renderImageLayer()}

        {/*<Draggables
          canvasSize={{
            x: Metrics.screenWidth,
            y: Metrics.screenHeight - Metrics.ratio(50)
          }}
          x={0}
          y={0}
        >
          <TouchableOpacity
            style={{
              width: Metrics.ratio(50),
              height: Metrics.ratio(50),
              borderRadius: Metrics.ratio(50) / 2,
              backgroundColor: Colors.secondary,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={this._onExitPress}
          >
            <Text style={ApplicationStyles.re17Primary}>Exit</Text>
          </TouchableOpacity>
        </Draggables>
          */}
      </View>
    );
  }
}

// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StatusBar,
//   ImageBackground,
//   AppState,
// } from 'react-native';
// import {Actions} from 'react-native-router-flux';
// import {ButtonView, Loading} from '../../components/';
// import {Metrics, Colors, ApplicationStyles} from '../../theme';
// import Utils from '../../utils';
// import Draggables from './Draggable';
// import {Images} from '../../theme';
// import {WebView} from 'react-native-webview';
// import { navPop } from '../../navigator';

// export default class GameView extends React.PureComponent {
//   constructor(props) {
//     super(props);

//     const {
//       user_id,
//       campaign_id,
//       gameInfo,
//       safeAreaTop,
//       safeAreaBottom,
//       baseUrl,
//       ln,
//     } = props;
//     const {game_path} = gameInfo;

//     const url =
//       game_path +
//       '?' +
//       Utils.getQueryStrings({
//         user_id,
//         campaign_id,
//         safeAreaTop,
//         safeAreaBottom,
//         baseUrl,
//         ln,
//       });

//     console.log('Game', Utils.getImagePath(url));

//     this.state = {
//       gameUrl: Utils.getImagePath(url),
//       loading: true,
//       showWebView: false,
//     };
//   }

//   appStateSubscription = null;

//   componentDidMount() {
//     this.appStateSubscription = AppState.addEventListener(
//       'change',
//       this._handleAppStateChange,
//     );
//     this.webview?.clearCache(true);
//     setTimeout(() => {
//       this.setState({showWebView: true});
//     }, 500);
//   }
//   componentWillUnmount() {
//     this.appStateSubscription?.remove();
//   }

//   _handleAppStateChange = currentAppState => {
//     // this.webview.postMessage(
//     //   currentAppState === "background" || "inactive" ? "pause" : "resume"
//     // );

//     // if (currentAppState === "active") {
//     //   //   this.webview.postMessage("resume");
//     //   this.webview.postMessage("pause");
//     // }

//     // this.webview.postMessage("pause");

//     if (
//       (Utils.isPlatformIOS() && currentAppState === 'inactive') ||
//       (Utils.isPlatformAndroid() && currentAppState === 'background')
//     ) {
//       this.webview.postMessage('pause');
//     } else if (currentAppState === 'active') {
//       this.webview.postMessage('resume');
//     }

//     console.log('currentAppState', currentAppState);
//   };

//   _onExitPress = () => {
//     const {callBack} = this.props;
//     if (callBack) callBack(false);
//     // Actions.pop();
//     navPop()
//   };

//   _onNavigationStateChanged = event => {
//     const {gameUrl} = this.state;

//     if (event.url !== gameUrl) {
//       const keyword = event.url.split('#')[1];

//       if (keyword) {
//         switch (keyword) {
//           case 'back':
//             const {callBack} = this.props;
//             if (callBack) callBack(false);
//             this.webview.stopLoading();
//             // Actions.pop();
//             navPop()
//             break;
//         }
//       }
//     }
//   };

//   renderImageLayer = () => {
//     return (
//       <ImageBackground
//         style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
//         source={Images.splash}
//       />
//     );
//   };

//   render() {
//     const {user_id, campaign_id, gameInfo} = this.props;
//     const {gameUrl, loading, showWebView} = this.state;
//     console.log('url', gameUrl);
//     return (
//       <View style={ApplicationStyles.scrollContainer}>
//         {showWebView && (
//           <WebView
//             incognito={true}
//             style={ApplicationStyles.flex}
//             cacheEnabled={false}
//             source={{
//               uri: gameUrl,
//             }}
//             ref={ref => {
//               this.webview = ref;
//             }}
//             onNavigationStateChange={this._onNavigationStateChanged}
//             onLoadEnd={() => {
//               this.setState({loading: false});
//             }}
//           />
//         )}

//         {/*        <Text onPress={() => this.webview.postMessage("pause")}>Pause</Text>
//         <Text onPress={() => this.webview.postMessage("resume")}>Resume</Text> */}

//         {/* <Loading
//           loading={loading}
//           showNative={false}
//           image={Images.gifs.loader}
//           isTransparent
//         /> */}

//         {loading && this.renderImageLayer()}

//         {/*<Draggables
//           canvasSize={{
//             x: Metrics.screenWidth,
//             y: Metrics.screenHeight - Metrics.ratio(50)
//           }}
//           x={0}
//           y={0}
//         >
//           <TouchableOpacity
//             style={{
//               width: Metrics.ratio(50),
//               height: Metrics.ratio(50),
//               borderRadius: Metrics.ratio(50) / 2,
//               backgroundColor: Colors.secondary,
//               alignItems: "center",
//               justifyContent: "center"
//             }}
//             onPress={this._onExitPress}
//           >
//             <Text style={ApplicationStyles.re17Primary}>Exit</Text>
//           </TouchableOpacity>
//         </Draggables>
//           */}
//       </View>
//     );
//   }
// }
