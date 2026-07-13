import React from 'react';
import {View, Image, Platform} from 'react-native';
import {Actions} from 'react-native-router-flux';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// import InstagramLogin from 'react-native-instagram-login';
// import Cookie from 'react-native-cookie';
// import CookieManager from '@react-native-community/cookies';
import CookieManager from '@react-native-cookies/cookies';

import {googleProfileRequestConfig} from '../../config/SocialLogin';
import {Images, ApplicationStyles, Strings, Colors, Metrics} from '../../theme';
import {GradientButtonBorder, SignUpOption} from '../../specifics';
import Utils from '../../utils';
//
import {connect} from 'react-redux';
import {WithFetching} from '../../HOC';
import {UPDATE_CHUNK_USER} from '../../actions/ActionTypes';
import {generalAction, generalSaveAction} from '../../actions/GeneralAction';
import {
  API_USER_SOCIAL_EXIST,
  API_USER_UPDATE,
  ERROR_SOMETHING_WENT_WRONG,
} from '../../config/WebService';
import FirebaseUtils from '../../utils/FirebaseUtils';
import {getInstagramUser} from '../../utils/InstaUtils';
import {
  PLATFORM_TYPE_GOOGLE,
  PLATFORM_TYPE_INSTAGRAM,
  PLATFORM_TYPE_APPLE,
} from '../../constants';
import AppleAuth from '../../utils/AppleAuth';

// import {getLocation} from '../../utils/MapUtils';
// import {checkAndRequestPermission} from '../../utils/PermissionUtils';

class LoginSelection extends React.PureComponent {
  componentDidMount() {
    this._configureGoogleSignIn();
  }

  state = {
    blockClick: false,
  };

  _onLoginPress = async () => {
    // if (this.state.blockClick) {
    //   return;
    // }
this.props.navigation.navigate("login");
    // Actions.login();
  };

  _onSignUpPress = () => {
    // Actions.signUp();
    this.props.navigation.navigate("signUp");
  };

  /**************Google Sign in methods ****************/



_configureGoogleSignIn() {
  GoogleSignin.configure(googleProfileRequestConfig);
}

_onGooglePress = async () => {
  console.log("here in google");

  // this._blockClick(true);
  await this.signOutGoogle();

  try {
    const hasPlay= await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
console.log("here im am ",hasPlay);

    const userInfo = await GoogleSignin.signIn();
    console.log("userInfo",userInfo);
    

    this._checkUserExist(userInfo.data.user);

  } catch (error) {
    console.log("error", error);
    this._blockClick(false);

    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log("Google Sign-in cancelled");
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log("Google Sign-in in progress");
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log("Play services not available");
    } else {
      console.log("Unknown Google error", error);
    }
  }
};

signOutGoogle = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (err) {
    console.log("Sign-out error:", err);
  }
};


  _onApplePress = async () => {
    // if (this.state.blockClick) {
    //   return;
    // }

    this._blockClick(true);
    try {
      await AppleAuth.loginWithApple(res => {
        this._checkUserExist(res, PLATFORM_TYPE_APPLE);
      });
    } catch (error) {
      this._blockClick(false);
      console.log('apple auth error ====>', error);
      // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //   // user cancelled the login flow
      // } else if (error.code === statusCodes.IN_PROGRESS) {
      //   // operation (f.e. sign in) is in progress already
      // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   // play services not available or outdated
      // } else {
      //   // some other error happened
      // }
    }
  };

  // signOutGoogle = async () => {
  //   const isSignedIn = await GoogleSignin.isSignedIn();
  //   if (isSignedIn) {
  //     try {
  //       await GoogleSignin.revokeAccess();
  //       await GoogleSignin.signOut();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  /******************** Instagram Methods *************************/

  _onInstagramPress = () => {
    // if (this.state.blockClick) {
    //   return;
    // }

    this._blockClick(true);

    CookieManager.clearAll(true).then(res => {
      console.log('CookieManager.clearAll =>', res);
      this.instagramLogin.show();
    });

    // clear sessions
    // Cookie.clear().then(() => {
    // this.instagramLogin.show();
    // });
  };

  _onInstagramToken = token => {
    const {cbShowLoader} = this.props;

    this._blockClick(false);
    cbShowLoader(true);

    setTimeout(() => {
      getInstagramUser(token.access_token)
        .then(userInfo => {
          this._checkUserExist(userInfo, PLATFORM_TYPE_INSTAGRAM);
          console.log('Insta User', userInfo);
        })
        .catch(error => {
          cbShowLoader(false);
          this._blockClick(false);
          Utils.showMessage(ERROR_SOMETHING_WENT_WRONG);
          console.log('Insta User error', error);
        });
    }, 500);
  };

  _onInstagramFailure = error => {
    this._blockClick(false);
    Utils.showMessage(ERROR_SOMETHING_WENT_WRONG);
    console.log('Insta Token error', error);
  };

  _onInstagramClose = () => {
    this._blockClick(false);
  };

  /******************** Custom Methods *****************************/
  _checkUserExist = async (user, platform_type = PLATFORM_TYPE_GOOGLE) => {
    const {generalAction, generalSaveAction, cbShowLoader} = this.props;

    // const payloadData = {  //PREVIOUS CODE
    //   platform_id: user.id,
    //   email: platform_type === PLATFORM_TYPE_GOOGLE ? user.email : '',
    // }

    const device_token = await FirebaseUtils.getTokenPromise();
    // const device_token = 'test'

    let payloadData;
    if (platform_type === PLATFORM_TYPE_APPLE) {
      payloadData = {
        full_name: user?.fullName?.givenName,
        email: user?.email,
        platform_id: user?.user,
        platform_type,
        device_token,
      };
    } else {
      payloadData = {
        full_name: user.givenName,
        email: platform_type === PLATFORM_TYPE_GOOGLE ? user.email : '',
        platform_id: user.id,
        platform_type,
        avatar: user.photo,
        device_token,
      };
    }

    cbShowLoader(true);
    generalAction(
      API_USER_SOCIAL_EXIST,
      payloadData,
      '',
      '',
      data => {
        generalSaveAction(UPDATE_CHUNK_USER, data);

        setTimeout(() => {
          // this._updateDeviceToken(data);
          if (Number(data?.status) === 0) {
            cbShowLoader(false);
            Utils.showMessage(Strings.errorVerifyAccount, 'warning');
            setTimeout(() => {
              this.props.navigation.navigate("verification", {
  user: {
    ...data,
    email: platform_type === PLATFORM_TYPE_GOOGLE ? user.email : '',
  },
  callback: () => {
    this._updateDeviceToken(data);
  },
});
              // Actions.verification({
              //   user: {
              //     ...data,
              //     email:
              //       platform_type === PLATFORM_TYPE_GOOGLE ? user.email : '',
              //   },
              //   callback: () => {
              //     this._updateDeviceToken(data);
              //     // this._updateDeviceToken({id: data?.user_id});
              //   },
              // });
            }, 500);
          } else {
            this._updateDeviceToken(data);
          }
        }, 300);
      },
      err => {
        cbShowLoader(false);
        this._blockClick(false);
        // this msg means user is not registered yet, need to sign up
        if (err === 'The selected platform id is invalid.') {
          // Actions.socialSignUp({user: {...user, platform_type}});
          this.props.navigation.navigate("socialSignUp", {
  user: {
    ...user,
    platform_type,
  },
});
          this._blockClick(false);
        } else {
          Utils.showMessage(err);
          this._blockClick(false);
        }
      },
      false,
      false,
      false,
    );
  };

  _blockClick = block => {
    this.setState({
      blockClick: block,
    });
  };

  _updateDeviceToken = async user => {
    const {generalAction, generalSaveAction, cbShowLoader} = this.props;

    const device_token = await FirebaseUtils.getTokenPromise();
    // const device_token = 'test'

    generalAction(
      API_USER_UPDATE,
      {
        id: user.id,
        device_token,
      },
      '',
      '',
      data => {
        user.device_token = device_token;

        // on response save data to user reducer
        generalSaveAction(UPDATE_CHUNK_USER, user);

        // disable loading
        cbShowLoader(false);

        setTimeout(() => {
          this._blockClick(false);
          // Actions.mainNavigator();
          this.props.navigation.navigate("MainRoot");
        }, 500);
      },
      err => {
        cbShowLoader(false);
        this._blockClick(false);
        generalSaveAction(UPDATE_CHUNK_USER, {});
      },
    );
  };

  render() {
    return (
      <View style={ApplicationStyles.scrollContainer}>
        <Image
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: Metrics.statusBarHeight,
          }}
          source={
            Utils.isPlatformAndroid()
              ? Images.login_bg_android
              : Images.login_bg
          }
        />
        <View
          style={{
            flex: 1,
            paddingHorizontal: Metrics.baseMargin * 1.25,
            justifyContent: 'flex-end',
          }}>
          <GradientButtonBorder
            title={Strings.button_login}
            onPress={this._onLoginPress}
          />
          <GradientButtonBorder
            title={Strings.button_google}
            onPress={this._onGooglePress}
            containerGradients={Colors.gradients.googleBg}
            borderGradients={Colors.gradients.googleBgBorder}
            icon={Images.google}
          />

          {Platform.OS === 'ios' && (
            <GradientButtonBorder
              title={Strings.button_apple}
              onPress={this._onApplePress}
              containerGradients={Colors.gradients.appleBg}
              borderGradients={Colors.gradients.appleBgBorder}
              icon={Images.apple}
            />
          )}

          {/* <GradientButtonBorder
            title={Strings.button_instagram}
            onPress={this._onInstagramPress}
            containerGradients={Colors.gradients.instagramBg}
            borderGradients={Colors.gradients.instagramBgBorder}
            icon={Images.instagram}
          /> */}

          <SignUpOption onPress={this._onSignUpPress} />
        </View>

        {/* <InstagramLogin
          appId="405416294316840"
          appSecret="db93f9a3fb62e4e28c677f2564e2a9ca"
          scopes={['user_profile']}
          ref={ref => (this.instagramLogin = ref)}
          onLoginSuccess={this._onInstagramToken}
          onLoginFailure={this._onInstagramFailure}
          onClose={this._onInstagramClose}
          redirectUrl="https://localhost/" // https://stackoverflow.com/questions/40400376/what-is-exact-redirect-uri-in-instagram-how-can-i-use-that-in-ios-app-enter-a
        /> */}
      </View>
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {generalAction, generalSaveAction};

export default connect(mapStateToProps, actions)(WithFetching(LoginSelection));
