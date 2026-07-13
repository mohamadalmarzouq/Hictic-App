import React from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {VerificationBox} from '../../components';
import {LoginHeader, GradientButtonBorder} from '../../specifics';
import {Strings, ApplicationStyles, Metrics, Colors} from '../../theme';
import {VERIFICATION_TYPE_CHANGE_NUMBER} from '../../constants';
import Utils from '../../utils';

//
import {connect} from 'react-redux';
import {WithFetching} from '../../HOC';
import {LOGIN_USER, UPDATE_CHUNK_USER} from '../../actions/ActionTypes';
import {generalAction, generalSaveAction} from '../../actions/GeneralAction';
import {
  API_VERIFY_PHONE,
  API_TWILIO_VERIFY_CHANGE_PHONE,
  API_TWILIO_SEND_CODE,
} from '../../config/WebService';
import { navPopTo } from '../../navigator';

const horizontalPadding = Metrics.baseMargin * 1.25;
const inputRightMargin = Metrics.smallMargin * 1.5;
const styles = {
  verificationContainer: {
    marginBottom: Metrics.doubleBaseMargin,
  },
  verificationInput: {
    backgroundColor: Colors.background.tertiary,
    borderRadius: Metrics.borderRadius,
    marginLeft: 0,
    marginRight: inputRightMargin,
    height:
      (Metrics.screenWidth - (horizontalPadding * 2 + inputRightMargin * 3)) /
      4,
    width:
      (Metrics.screenWidth - (horizontalPadding * 2 + inputRightMargin * 3)) /
      4,
    padding: Metrics.baseMargin,
    color: Colors.text.secondary,
  },
};

class Verification extends React.PureComponent {
  _onCompleteVerificationCode = verificationCode => {
    const {verificationType} = this.props.route.params;

    if (verificationType === VERIFICATION_TYPE_CHANGE_NUMBER) {
      this._verifyChangeNumber(verificationCode);
    } else {
      this._verifySignUp(verificationCode);
    }
  };

  _verifySignUp = verificationCode => {
    const {generalAction, generalSaveAction, cbShowLoader, callback} =
      this.props;
      const {user}=this.props.route.params
    cbShowLoader(true);
    generalAction(
      API_VERIFY_PHONE,
      {
        user: user.id,
        code: verificationCode,
      },
      '',
      '',
      data => {
        const userData = data.user;
        generalSaveAction(LOGIN_USER.SUCCESS, userData);
        cbShowLoader(false);
        setTimeout(() => {
          if (callback) {
            callback();
          } else {
            // Actions.mainNavigator();
            this.props.navigation.navigate("MainRoot");
          }
        }, 500);
      },
      () => {
        cbShowLoader(false);
      },
      false,
      true,
    );
  };

  _verifyChangeNumber = verificationCode => {
    const {generalAction, generalSaveAction, cbShowLoader} =
      this.props;
      const{userId,newPhone}=this.props.route.params;
    cbShowLoader(true);
    generalAction(
      API_TWILIO_VERIFY_CHANGE_PHONE,
      {
        user: userId,
        phone: newPhone,
        code: verificationCode,
      },
      '',
      '',
      data => {
        generalSaveAction(UPDATE_CHUNK_USER, {phone: newPhone});
        cbShowLoader(false);
        Utils.showMessage(Strings.phone_changes_msg, 'success');
        setTimeout(() => {
          // Actions.popTo('accountSettings');
          navPopTo('accountSettings');
        }, 500);
      },
      () => {
        cbShowLoader(false);
      },
    );
  };

  _resendCodePress = () => {
    const {
      generalAction,
      cbShowLoader,
    } = this.props;
     const{user,newPhone,verificationType,email,}=this.props.route.params;

    const phoneNumber =
      verificationType === VERIFICATION_TYPE_CHANGE_NUMBER
        ? newPhone
        : user.phone;

    const email_address = email ?? user?.email;

    let payload = {
      email: email_address,
    };

    if (phoneNumber) {
      payload.phone_number = phoneNumber;
    }
    cbShowLoader(true);
    generalAction(
      API_TWILIO_SEND_CODE,
      payload,
      '',
      '',
      data => {
        cbShowLoader(false);
      },
      () => {
        cbShowLoader(false);
      },
    );
  };

  render() {
    return (
      <View style={ApplicationStyles.container}>
        <LoginHeader
          title={Strings.verification_title}
          description={
            this.props.route.params.verificationType === VERIFICATION_TYPE_CHANGE_NUMBER
              ? Strings.verification_description
              : // ? Strings.verification_description_phone
                Strings.verification_description
          }
        />
        <VerificationBox
          containerStyle={styles.verificationContainer}
          customInputStyle={styles.verificationInput}
          ref={ref => {
            this.verificationBox = ref;
          }}
          numberOfInputBoxs={4}
          onComplete={this._onCompleteVerificationCode}
        />
        {
          <GradientButtonBorder
            title={Strings.button_resend_code}
            onPress={this._resendCodePress}
          />
        }
      </View>
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {generalAction, generalSaveAction};

export default connect(mapStateToProps, actions)(WithFetching(Verification));
