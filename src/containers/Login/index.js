import React from 'react';
import {Text, ScrollView, Keyboard, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ButtonView, FloatLabelTextInput} from '../../components';
import {LoginHeader, GradientButtonBorder, SignUpOption} from '../../specifics';
import {Images, Strings, ApplicationStyles, Metrics} from '../../theme';
import Utils from '../../utils';

//
import {connect} from 'react-redux';
import {WithFetching} from '../../HOC';
import {LOGIN_USER, UPDATE_CHUNK_USER} from '../../actions/ActionTypes';
import {generalAction, generalSaveAction} from '../../actions/GeneralAction';
import {API_USER_LOGIN, API_USER_UPDATE} from '../../config/WebService';
import FirebaseUtils from '../../utils/FirebaseUtils';

class Login extends React.PureComponent {
  _onSignInPress = () => {
    const inputFields = [this.emailInput, this.passInput];
    if (Utils.validateFields(inputFields)) {
      const {generalAction, generalSaveAction, cbShowLoader} = this.props;
      // set focus on email due to keyboard hide issue if focus on password
      this.emailInput.focus();
      Keyboard.dismiss();

      const payload = {
        email: this.emailInput.getText(),
        password: this.passInput.getText(),
      };

      cbShowLoader(true);
      generalAction(
        API_USER_LOGIN,
        payload,
        // LOGIN_USER.SUCCESS,
        '',
        '',
        data => {
          if (Number(data?.status) === 0) {
            cbShowLoader(false);
            Utils.showMessage(Strings.errorVerifyAccount, 'warning');
            setTimeout(() => {
              // Actions.verification({
              //   user: {
              //     ...data,
              //     email: payload.email,
              //   },
              //   callback: () => {
              //     // generalSaveAction(LOGIN_USER.SUCCESS, data);
              //     this._updateDeviceToken(data);
              //     // this._updateDeviceToken({id: data?.user_id});
              //   },
              // });
              this.props.navigation.navigate("verification", {
  user: {
    ...data,
    email: payload.email,
  },
  callback: () => {
    // generalSaveAction(LOGIN_USER.SUCCESS, data);
    this._updateDeviceToken(data);
  },
});
            }, 500);
          } else {
            generalSaveAction(LOGIN_USER.SUCCESS, data);
            this._updateDeviceToken(data);
          }
        },
        err => {
          cbShowLoader(false);
        },
      );
    }
  };

  _updateDeviceToken = async user => {
    const {generalAction, generalSaveAction, cbShowLoader} = this.props;

    // const device_token = 'test'
    const device_token = await FirebaseUtils.getTokenPromise();

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
          // Actions.mainNavigator(); 
          this.props.navigation.navigate("MainRoot");
          
        }, 500);
      },
      err => {
        cbShowLoader(false);
        generalSaveAction(UPDATE_CHUNK_USER, {});
      },
    );
  };

  _setFocusPassword = () => {
    this.passInput.focus();
  };

  _onForgotPress = () => {
    // Actions.forgotPwd();
    this.props.navigation.navigate("forgotPwd") 
  };

  _onSignUpPress = () => {
    // Actions.signUp();
    this.props.navigation.navigate("signUp") 
  };

  _renderEmail() {
    return (
      <FloatLabelTextInput
        returnKeyType="next"
        ref={ref => {
          this.emailInput = ref;
        }}
        errorType="email"
        errorMessage={Strings.errorMessageEmail}
        errorMessageRequired={Strings.errorMessageEmailRequired}
        keyboardType="email-address"
        onSubmitEditing={this._setFocusPassword}
        placeholder={Strings.email}
      />
    );
  }

  _renderPassword() {
    return (
      <FloatLabelTextInput
        secureTextEntry
        returnKeyType="done"
        ref={ref => {
          this.passInput = ref;
        }}
        errorType="required"
        errorMessage={Strings.errorMessagePasswordRequired}
        placeholder={Strings.password}
        onFocusSet={() =>
          Utils.scrollToPosition(this.scrollView, this.passInput)
        }
        // rightText={Strings.button_forgot}
        // onRightTextPress={this._onForgotPress}
        onSubmitEditing={this._onSignInPress}
        rightTextStyle={{marginRight: -(Metrics.smallMargin / 2)}}
        isPassword
      />
    );
  }

  _renderForgotPassword() {
    return (
      <ButtonView style={styles.forgotContainer} onPress={this._onForgotPress}>
        <Text style={ApplicationStyles.m17Secondary}>
          {Strings.button_forgot}
        </Text>
      </ButtonView>
    );
  }

  render() {
    return (
      <ScrollView
        style={ApplicationStyles.container}
        keyboardShouldPersistTaps="handled"
        ref={ref => {
          this.scrollView = ref;
        }}>
        <LoginHeader
          title={Strings.login_title}
          image={Images.login_header}
          containerStyle={{paddingBottom: 0}}
        />

        {this._renderEmail()}
        {this._renderPassword()}
        {this._renderForgotPassword()}

        <GradientButtonBorder
          title={Strings.button_login}
          onPress={this._onSignInPress}
        />
        <SignUpOption onPress={this._onSignUpPress} isSecondary />
      </ScrollView>
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {generalAction, generalSaveAction};

export default connect(mapStateToProps, actions)(WithFetching(Login));

const styles = StyleSheet.create({
  forgotContainer: {
    alignSelf: 'flex-end',
    paddingTop: Metrics.ratio(5),
    paddingBottom: Metrics.ratio(20),
  },
});
