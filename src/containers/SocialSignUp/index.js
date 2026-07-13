import React from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {FloatLabelTextInput} from '../../components';
import {LoginHeader, GradientButtonBorder} from '../../specifics';
import {Strings, ApplicationStyles} from '../../theme';
import {
  PHONE_NUM_LIMIT,
  PLATFORM_TYPE_GOOGLE,
  PLATFORM_TYPE_INSTAGRAM,
} from '../../constants';
import Utils from '../../utils';

//
import {connect} from 'react-redux';
import {WithFetching} from '../../HOC';
import {generalAction} from '../../actions/GeneralAction';
import {API_USER_SOCIAL_LOGIN} from '../../config/WebService';

class SocialSignUp extends React.PureComponent {
  state = {
    countryData: {cca2: 'US', callingCode: '1'},
  };

  _onSubmitPress = () => {
    const {generalAction, cbShowLoader} = this.props;
    const {user}=this.props.route.params

    const inputFields = [this.phoneInput];

    // if ints login then get email from user and validate
    if (user.platform_type === PLATFORM_TYPE_INSTAGRAM) {
      inputFields.push(this.emailInput);
    }

    if (Utils.validateFields(inputFields)) {
      cbShowLoader(true);

      const newUser = {
        phone: this.phoneInput.getText(),
        platform_type: user.platform_type,
        platform_id: user.id,
      };

      // set data from gmail user object
      if (user.platform_type === PLATFORM_TYPE_GOOGLE) {
        newUser.full_name = user.name;
        newUser.email = user.email;
        newUser.avatar = user.photo;
      }

      // set data from insta user object
      else if (user.platform_type === PLATFORM_TYPE_INSTAGRAM) {
        newUser.full_name = user.full_name;
        newUser.email = this.emailInput.getText();
        newUser.avatar = user.profile_picture;
      }

      generalAction(
        API_USER_SOCIAL_LOGIN,
        newUser,
        '',
        '',
        data => {
          cbShowLoader(false);
          setTimeout(() => {
            // Actions.verification({user: {...newUser, ...data}});
             this.props.navigation.navigate("verification",{user: {...newUser, ...data}})
          }, 500);
        },
        () => {
          cbShowLoader(false);
        },
      );
    }
  };

  _setFocusPhone = () => {
    this.phoneInput.focus();
  };

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
        // onSubmitEditing={this._setFocusPassword}
        placeholder={Strings.phone}
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

  render() {
    const {user} = this.props.route.params;

    return (
      <View style={ApplicationStyles.container}>
        <LoginHeader title={Strings.add_details} />
        {user.platform_type === PLATFORM_TYPE_INSTAGRAM && this._renderEmail()}
        {this._renderPhone()}
        <GradientButtonBorder
          title={Strings.button_submit}
          onPress={this._onSubmitPress}
        />
      </View>
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {generalAction};

export default connect(mapStateToProps, actions)(WithFetching(SocialSignUp));
