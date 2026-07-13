import React from 'react';
import {View, Keyboard} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {FloatLabelTextInput} from '../../components';
import {LoginHeader, GradientButtonBorder} from '../../specifics';
import {Strings, ApplicationStyles} from '../../theme';
import Utils from '../../utils';

//
import {connect} from 'react-redux';
import {WithFetching} from '../../HOC';
import {generalAction} from '../../actions/GeneralAction';
import {API_USER_REQUEST_FORGOT_PWD} from '../../config/WebService';
import { navPop } from '../../navigator';

class ForgotPwd extends React.PureComponent {
  _onSubmitPress = () => {
    const inputFields = [this.emailInput];
    if (Utils.validateFields(inputFields)) {
      const {generalAction, cbShowLoader} = this.props;

      Keyboard.dismiss();
      cbShowLoader(true);
      generalAction(
        API_USER_REQUEST_FORGOT_PWD,
        {
          email: this.emailInput.getText(),
        },
        '',
        '',
        data => {
          cbShowLoader(false);
          Utils.showMessage(
            data.api_message || Strings.forgot_pwd_msg,
            'success',
          );
          setTimeout(() => {
            // Actions.pop();
            navPop()
          }, 500);
        },
        err => {
          cbShowLoader(false);
        },
        true,
      );
    }
  };

  _renderEmail() {
    return (
      <FloatLabelTextInput
        returnKeyType="done"
        ref={ref => {
          this.emailInput = ref;
        }}
        errorType="email"
        errorMessage={Strings.errorMessageEmail}
        errorMessageRequired={Strings.errorMessageEmailRequired}
        keyboardType="email-address"
        onSubmitEditing={this._onSubmitPress}
        placeholder={Strings.email}
      />
    );
  }

  render() {
    return (
      <View style={ApplicationStyles.container}>
        <LoginHeader title={Strings.forgot_pwd_title} />
        {this._renderEmail()}

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

export default connect(mapStateToProps, actions)(WithFetching(ForgotPwd));
