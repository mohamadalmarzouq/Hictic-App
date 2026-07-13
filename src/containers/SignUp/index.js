import React from 'react';
import {View, ScrollView, Keyboard} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {FloatLabelTextInput} from '../../components';
import {LoginHeader, GradientButtonBorder, SignUpOption} from '../../specifics';
import {Strings, ApplicationStyles} from '../../theme';
import Utils from '../../utils';
import {
  MAX_NAME_LENGTH,
  PASSWORD_MAX_LIMIT,
  PHONE_NUM_LIMIT,
} from '../../constants';

//
import {connect} from 'react-redux';
import {WithFetching} from '../../HOC';
import {generalAction} from '../../actions/GeneralAction';
import {API_USER_SIGN_UP} from '../../config/WebService';
import { navPop } from '../../navigator';

class SignUp extends React.PureComponent {
  state = {
    countryData: {cca2: 'US', callingCode: '1'},
  };

  _onSignUpPress = () => {
    const inputFields = [
      this.nameInput,
      this.emailInput,
      // this.phoneInput,
      this.passInput,
      this.confirmPassInput,
    ];
    if (Utils.validateFields(inputFields)) {
      const {generalAction, cbShowLoader} = this.props;
      // set focus on first name due to keyboard hide issue if focus on password
      this.nameInput.focus();
      Keyboard.dismiss();
      cbShowLoader(true);
      const propsData = {
        email: this.emailInput.getText(),
        // phone: this.phoneInput.getText(),
      };
      generalAction(
        API_USER_SIGN_UP,
        {
          full_name: this.nameInput.getText(),
          email: this.emailInput.getText(),
          // phone: this.phoneInput.getText(),
          password: this.passInput.getText(),
          platform_type: 'custom',
        },
        '',
        '',
        data => {
          cbShowLoader(false);
          console.log('data', data);

          setTimeout(() => {
            // Actions.verification({
            //   user: {
            //     ...propsData,
            //     ...data,
            //   },
            // });
            this.props.navigation.navigate("verification",{
              user: {
                ...propsData,
                ...data,
              },
            })
          }, 500);
        },
        () => {
          cbShowLoader(false);
        },
      );
    }
  };

  _onSignInPress = () => {
    // Actions.pop();
    navPop()
  };

  _onCountryCodePress = () => {
    alert('Hey');
  };

  _setFocusEmail = () => {
    this.emailInput.focus();
  };

  _setFocusPhone = () => {
    this.phoneInput.focus();
  };

  _setFocusPassword = () => {
    this.passInput.focus();
  };
  _setFocusConfirmPassword = () => {
    this.confirmPassInput.focus();
  };
  _getPasswordText = () => {
    return this.passInput.getText();
  };

  _renderName() {
    return (
      <FloatLabelTextInput
        returnKeyType="next"
        ref={ref => {
          this.nameInput = ref;
        }}
        autoCapitalize="sentences"
        onSubmitEditing={this._setFocusEmail}
        placeholder={Strings.name}
        errorType="required"
        onFocusSet={() =>
          Utils.scrollToPosition(this.scrollView, this.nameInput)
        }
        errorMessage={Strings.errorMessageName}
        maxLength={MAX_NAME_LENGTH}
      />
    );
  }

  _renderEmail() {
    return (
      <FloatLabelTextInput
        returnKeyType="next"
        ref={ref => {
          this.emailInput = ref;
        }}
        keyboardType="email-address"
        onSubmitEditing={this._setFocusPhone}
        placeholder={Strings.email}
        errorType="email"
        errorMessage={Strings.errorMessageEmail}
        onFocusSet={() =>
          Utils.scrollToPosition(this.scrollView, this.emailInput)
        }
        errorMessageRequired={Strings.errorMessageEmailRequired}
      />
    );
  }

  _renderPhone = () => {
    const {countryData} = this.state;

    return (
      <FloatLabelTextInput
        returnKeyType="next"
        ref={ref => {
          this.phoneInput = ref;
        }}
        keyboardType="number-pad"
        onSubmitEditing={this._setFocusPassword}
        placeholder={Strings.phone}
        onFocusSet={() =>
          Utils.scrollToPosition(this.scrollView, this.phoneInput)
        }
        errorMessage={Strings.errorMessagePhone}
        errorMessageRequired={Strings.errorMessagePhoneRequired}
        errorType="phone"
        disableFloating
        maxLength={PHONE_NUM_LIMIT}
        countryData={countryData}
        isCountryCode
      />
    );
  };

  _renderPassword() {
    return (
      <FloatLabelTextInput
        secureTextEntry
        returnKeyType="next"
        ref={ref => {
          this.passInput = ref;
        }}
        placeholder={Strings.password}
        errorType="password"
        onFocusSet={() =>
          Utils.scrollToPosition(this.scrollView, this.passInput)
        }
        errorMessage={Strings.errorMessagePassword}
        onSubmitEditing={this._setFocusConfirmPassword}
        maxLength={PASSWORD_MAX_LIMIT}
        isPassword
      />
    );
  }

  _renderConfirmPassword() {
    return (
      <FloatLabelTextInput
        secureTextEntry
        returnKeyType="done"
        ref={ref => {
          this.confirmPassInput = ref;
        }}
        placeholder={Strings.confirm_pwd}
        onSubmitEditing={this._onSignUpPress}
        errorType="confirm_password"
        onFocusSet={() =>
          Utils.scrollToPosition(this.scrollView, this.confirmPassInput)
        }
        errorMessage={Strings.errorMessageConfirmPassword}
        newPassword={this.passInput}
        getNewPassword={this._getPasswordText}
        maxLength={PASSWORD_MAX_LIMIT}
        isPassword
      />
    );
  }

  render() {
    return (
      <ScrollView
        style={ApplicationStyles.scrollContainer}
        keyboardShouldPersistTaps="always"
        ref={ref => {
          this.scrollView = ref;
        }}>
        <View style={ApplicationStyles.container}>
          <LoginHeader title={Strings.sign_up_title} />

          {this._renderName()}
          {this._renderEmail()}
          {/* {this._renderPhone()} */}
          {this._renderPassword()}
          {this._renderConfirmPassword()}

          <GradientButtonBorder
            title={Strings.button_sign_up}
            onPress={this._onSignUpPress}
          />
          <SignUpOption onPress={this._onSignInPress} isSecondary showLogin />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {generalAction};

export default connect(mapStateToProps, actions)(WithFetching(SignUp));
