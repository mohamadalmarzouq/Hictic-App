import React from 'react';
import {View, ScrollView, Keyboard} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  FloatLabelTextInput,
  FloatLabelTextInputMultiline,
} from '../../components';
import {GradientButtonBorder} from '../../specifics';
import {Strings, ApplicationStyles, Metrics} from '../../theme';
import Utils from '../../utils';

//
import {connect} from 'react-redux';
import {WithFetching} from '../../HOC';
import {generalAction} from '../../actions/GeneralAction';
import {API_SUBMIT_SUPPORT} from '../../config/WebService';
import { navGoBack, navPop } from '../../navigator';

class Support extends React.PureComponent {
  _onSubmitPress = () => {
    const inputFields = [this.nameInput, this.emailInput, this.messageInput];
    if (Utils.validateFields(inputFields)) {
      const {generalAction, cbShowLoader} = this.props;
      // set focus on first name due to keyboard hide issue if focus on password
      this.nameInput.focus();
      Keyboard.dismiss();
      cbShowLoader(true);

      generalAction(
        API_SUBMIT_SUPPORT,
        {
          name: this.nameInput.getText(),
          email: this.emailInput.getText(),
          message: this.messageInput.getText(),
        },
        '',
        '',
        data => {
          cbShowLoader(false);
          Utils.showMessage(Strings.support_success_msg, 'success');
          setTimeout(() => {
            // Actions.pop();
            navPop()
            // navGoBack()
          }, 500);
        },
        () => {
          cbShowLoader(false);
        },
      );
    }
  };

  _renderName = () => {
    const {full_name} = this.props.user.data;
    return (
      <FloatLabelTextInput
        returnKeyType="next"
        ref={ref => {
          this.nameInput = ref;
        }}
        valueText={full_name}
        autoCapitalize="sentences"
        // onSubmitEditing={this._setFocusEmail}
        placeholder={Strings.name}
        errorType="required"
        onFocusSet={() =>
          Utils.scrollToPosition(this.scrollView, this.nameInput)
        }
        errorMessage={Strings.errorMessageName}
      />
    );
  };

  _renderEmail = () => {
    const {email} = this.props.user.data;
    return (
      <FloatLabelTextInput
        returnKeyType="next"
        ref={ref => {
          this.emailInput = ref;
        }}
        valueText={email}
        keyboardType="email-address"
        // onSubmitEditing={this._setFocusPhone}
        placeholder={Strings.email}
        errorType="email"
        errorMessage={Strings.errorMessageEmail}
        onFocusSet={() =>
          Utils.scrollToPosition(this.scrollView, this.emailInput)
        }
        errorMessageRequired={Strings.errorMessageEmailRequired}
      />
    );
  };

  _renderMessage() {
    return (
      <FloatLabelTextInputMultiline
        fixedHeight={false}
        returnKeyType="done"
        ref={ref => {
          this.messageInput = ref;
        }}
        autoCapitalize="sentences"
        placeholder={Strings.message}
        errorType="required"
        errorMessage={Strings.errorMessageSupportMessage}
        multiline
        maxLength={4096}
      />
    );
  }

  render() {
    return (
      <ScrollView
        style={[
          ApplicationStyles.container,
          {paddingVertical: Metrics.doubleBaseMargin},
        ]}
        keyboardShouldPersistTaps="always"
        ref={ref => {
          this.scrollView = ref;
        }}>
        {this._renderName()}
        {this._renderEmail()}
        {this._renderMessage()}

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

export default connect(mapStateToProps, actions)(WithFetching(Support));
