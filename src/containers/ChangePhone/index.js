import React from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {FloatLabelTextInput} from '../../components';
import {LoginHeader, GradientButtonBorder} from '../../specifics';
import {Strings, ApplicationStyles} from '../../theme';
import {
  PHONE_NUM_LIMIT,
  VERIFICATION_TYPE_CHANGE_NUMBER,
} from '../../constants';
import Utils from '../../utils';

//
import {connect} from 'react-redux';
import {WithFetching} from '../../HOC';
import {generalAction} from '../../actions/GeneralAction';
import {API_TWILIO_SEND_CODE} from '../../config/WebService';
import { navPop } from '../../navigator';

class ChangePhone extends React.PureComponent {
  constructor(props) {
    super(props);

    const {phone} = props.user.data;

    const phoneData = phone.split('-');
    const callingCode = phoneData[0].substring(1); // remove + from code

    this.state = {
      countryData: {
        cca2: Utils.getCountryCode(callingCode),
        callingCode: callingCode,
      },
      phoneNumberWithoutCode: phoneData[1],
    };
  }

  _onSubmitPress = () => {
    const inputFields = [this.phoneInput];
    if (Utils.validateFields(inputFields)) {
      const {user, generalAction, cbShowLoader} = this.props;

      const newPhone = this.phoneInput.getText();

      if (user.data.phone === newPhone) {
        // Actions.pop();
        navPop()
      } else {
        cbShowLoader(true);
        generalAction(
          API_TWILIO_SEND_CODE,
          {
            phone_number: newPhone,
            email: user?.data?.email,
          },
          '',
          '',
          data => {
            cbShowLoader(false);

            setTimeout(() => {
              // Actions.verificationMain({
              //   userId: user.data.id,
              //   newPhone: newPhone,
              //   verificationType: VERIFICATION_TYPE_CHANGE_NUMBER,
              //   email: user?.data?.email,
              // });
              this.props.navigation.navigate("verificationMain",{
                userId: user.data.id,
                newPhone: newPhone,
                verificationType: VERIFICATION_TYPE_CHANGE_NUMBER,
                email: user?.data?.email,
              })
            }, 500);
          },
          () => {
            cbShowLoader(false);
          },
        );
      }
    }
  };

  _renderPhone = () => {
    const {countryData, phoneNumberWithoutCode} = this.state;

    return (
      <FloatLabelTextInput
        returnKeyType="next"
        ref={ref => {
          this.phoneInput = ref;
        }}
        valueText={phoneNumberWithoutCode}
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
    return (
      <View style={ApplicationStyles.container}>
        <LoginHeader title={Strings.change_phone} />
        {this._renderPhone()}
        <GradientButtonBorder
          title={Strings.button_submit}
          onPress={this._onSubmitPress}
        />
      </View>
    );
  }
}

const mapStateToProps = ({user}) => ({user});

const actions = {generalAction};

export default connect(mapStateToProps, actions)(WithFetching(ChangePhone));
