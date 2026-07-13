import React from 'react';
import {View, ScrollView, Keyboard} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {FloatLabelTextInput} from '../../components';
import {LoginHeader, GradientButtonBorder} from '../../specifics';
import {Strings, ApplicationStyles} from '../../theme';
import Utils from '../../utils';

//
import {connect} from 'react-redux';
import {WithFetching} from '../../HOC';
import {generalAction} from '../../actions/GeneralAction';
import {API_CHANGE_PASSWORD} from '../../config/WebService';
import {PASSWORD_MAX_LIMIT} from '../../constants';
import { navPop } from '../../navigator';

class ChangePwd extends React.PureComponent {
  _onSubmitPress = () => {
    if (Utils.validateFields(this.refsArray)) {
      const {generalAction, cbShowLoader, user} = this.props;
      // set focus on email due to keyboard hide issue if focus on password

      Keyboard.dismiss();
      this.refsArray[0].blur();
      this.refsArray[1].blur();
      this.refsArray[2].blur();

      cbShowLoader(true);
      generalAction(
        API_CHANGE_PASSWORD,
        {
          id: user.data.id,
          old_password: this.refsArray[0].getText(),
          password: this.refsArray[1].getText(),
        },
        '',
        '',
        data => {
          cbShowLoader(false);
          Utils.showMessage(Strings.password_change_msg, 'success');
          setTimeout(() => {
            // Actions.pop();
            navPop()
          }, 1000);
        },
        err => {
          cbShowLoader(false);
        },
      );
    }
  };

  _getNewPasswordText = () => {
    return this.refsArray[1].getText();
  };

  _handleSubmitEditing(index) {
    if (index === this.refsArray.length - 1) {
      this._onSubmitPress();
    } else {
      this.refsArray[index + 1].focus();
    }
  }

  refsArray = [];

  _renderPassword(index, rest) {
    const returnKeyType = index === 2 ? 'done' : 'next';
    return (
      <FloatLabelTextInput
        secureTextEntry
        returnKeyType={returnKeyType}
        ref={ref => {
          this.refsArray[index] = ref;
        }}
        onSubmitEditing={() => this._handleSubmitEditing(index)}
        isPassword
        {...rest}
      />
    );
  }

  render() {
    return (
      <ScrollView
        style={ApplicationStyles.scrollContainer}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={ApplicationStyles.container}>
        <LoginHeader title={Strings.change_pwd_title} />

        {this._renderPassword(0, {
          placeholder: Strings.old_pwd,
          errorType: 'required',
          errorMessage: Strings.errorMessageOldPassword,
        })}
        {this._renderPassword(1, {
          placeholder: Strings.new_pwd,
          errorType: 'password',
          errorMessage: Strings.errorMessagePassword,
          maxLength: PASSWORD_MAX_LIMIT,
        })}
        {this._renderPassword(2, {
          newPassword: this.refsArray[1],
          getNewPassword: this._getNewPasswordText,
          placeholder: Strings.confirm_pwd,
          errorType: 'confirm_password',
          errorMessage: Strings.errorMessageNewConfirmPassword,
          maxLength: PASSWORD_MAX_LIMIT,
        })}

        <GradientButtonBorder
          title={Strings.button_submit}
          onPress={this._onSubmitPress}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = ({user}) => ({user});

const actions = {generalAction};

export default connect(mapStateToProps, actions)(WithFetching(ChangePwd));
