// @flow
import React from 'react';
import {View, Image, Platform} from 'react-native';
import PropTypes from 'prop-types';
import CountryPicker from 'react-native-country-picker-modal';

import styles from './styles';
import {Text, ButtonView} from '../../components';
import FloatLabelTextInputRN from './signleline';
import {Colors, Images, Metrics} from '../../theme';
import Util from '../../utils';
const PHONE_MIN_LENGTH = 7;

export default class FloatLabelTextInput extends React.PureComponent {
  static propTypes = {
    secureTextEntry: PropTypes.bool,
    initialValue: PropTypes.string,
    rightText: PropTypes.string,
    leftText: PropTypes.string,
    onLeftTextPress: PropTypes.func,
    onRightTextPress: PropTypes.func,
    placeholder: PropTypes.string.isRequired,
    customContainerStyle: PropTypes.any,
    rightImage: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    errorType: PropTypes.string,
    errorMessage: PropTypes.string,
    errorMessageRequired: PropTypes.string,
    valueText: PropTypes.string,
    onChangeTextInput: PropTypes.func,
    onFocusSet: PropTypes.func,
    onPress: PropTypes.func,
    disableRipple: PropTypes.bool,
    countryData: PropTypes.object,
    isCountryCode: PropTypes.bool,
    rightTextStyle: PropTypes.object,
  };

  static defaultProps = {
    secureTextEntry: false,
    initialValue: '',
    onLeftTextPress: () => {},
    onRightTextPress: () => {},
    onFocusSet: () => {},
    rightText: undefined,
    leftText: undefined,
    errorMessageRequired: undefined,
    customContainerStyle: {},
    rightImage: undefined,
    showError: false,
    errorType: undefined,
    errorMessage: 'Field can not be empty',
    valueText: '',
    onChangeTextInput: undefined,
    onPress: undefined,
    disableRipple: true,
    countryData: {cca2: 'US', callingCode: '1'},
    isCountryCode: false,
    rightTextStyle: {},
  };

  constructor(props) {
    super(props);
    this.valueTextInput = props.valueText;

    this.state = {
      showError: false,
      validationMessage: 'errorMessage',
      countryData: props.countryData,
      showPassword: this.props.secureTextEntry,
    };
  }

  handleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  focus = () => {
    if (this.input?.isFocused()) {
      this.props.onFocusSet();
    } else {
      this.input?.focus();
    }
  };

  getText = () => {
    const {isCountryCode} = this.props;
    const {countryData} = this.state;

    return isCountryCode && countryData.callingCode
      ? `+${countryData.callingCode}-${this.input?.getText()}`
      : this.input?.getText();
  };

  getValueTextInput = () => {
    return this.valueTextInput;
  };

  setText = text => {
    this.input?.setText(text);
    this.setTextInput(text);
  };

  setTextInput = text => {
    this.valueTextInput = text;
    if (this.props.onChangeTextInput) {
      this.props.onChangeTextInput(text);
    }
  };

  blur = () => {
    if (this.input?.isFocused()) {
      this.input?.blur();
    }
  };

  checkValidation = (
    isFormSubmit = false,
    setFocus = false,
    hideError = false,
  ) => {
    const {errorType} = this.props;
    const {showError} = this.state;

    if (!errorType) {
      return true;
    }

    if (this.checkValidationWithText() || hideError) {
      if (showError) {
        this.setState({showError: false});
      }
      return true;
    }

    if (setFocus) {
      const {editable} = this.props;
      if (editable !== false) {
        this.focus();
        //this.input?.focus();
      }
    }

    if (
      isFormSubmit ||
      (this.validationMessage !== this.state.validationMessage && showError)
    ) {
      this.setState({
        showError: true,
        validationMessage: this.validationMessage,
      });
    }

    return false;
  };

  checkValidationWithText = () => {
    const {errorType, isEmptyValid, getNewPassword} = this.props;
    const {countryData} = this.state;
    const text = this.input?.getText().trim();
    if (isEmptyValid && (!text || text === '')) {
      return true;
    } else if (errorType === 'required' && text) {
      return true;
    } else if (errorType === 'email') {
      if (!text || text === '') {
        this.validationMessage = 'required';
        return false;
      } else if (!Util.validateEmail(text)) {
        this.validationMessage = 'errorMessage';
        return false;
      }
      return true;
    } else if (errorType === 'phone') {
      if (!text || text === '') {
        this.validationMessage = 'required';
        return false;
      }
      // else if (
      //   countryData &&
      //   countryData.cca2 &&
      //   countryData.callingCode &&
      //   !Util.isValidNumber(countryData.cca2, text)
      // ) {
      //   this.validationMessage = "errorMessage";
      //   return false;
      // }
      else if (text.length < PHONE_MIN_LENGTH || !Util.validatePhone(text)) {
        this.validationMessage = 'errorMessage';
        return false;
      }
      return true;
    } else if (errorType === 'password' && Util.validatePassword(text)) {
      return true;
    } else if (errorType === 'numeric' && Util.validateNumeric(text)) {
      return true;
    } else if (errorType === 'decimal' && Util.validateDecimal(text)) {
      return true;
    } else if (errorType === 'confirm_password') {
      const newPasswordText = getNewPassword ? getNewPassword() : '';
      return newPasswordText === text;
    }
    return false;
  };

  valueTextInput = '';
  validationMessage = 'errorMessage';

  render() {
    const {
      rightImage,
      rightText,
      onLeftTextPress,
      onRightTextPress,
      customContainerStyle,
      placeholder,
      secureTextEntry,
      errorMessage,
      onPress,
      disableRipple,
      errorMessageRequired,
      leftText,
      isCountryCode,
      rightTextStyle,
      isPassword,
      ...reset
    } = this.props;
    const {showError, validationMessage} = this.state;

    const borderBottomColor = showError
      ? Colors.background.error
      : Colors.background.border;

    const errorStyle = showError
      ? {
          borderWidth: 1,
          borderColor: Colors.error,
          marginBottom: Metrics.ratio(0),
        }
      : {
          borderWidth: 0,
          marginBottom: Metrics.ratio(10),
        };

    const messageError =
      validationMessage === 'required' && errorMessageRequired
        ? errorMessageRequired
        : errorMessage;

    return (
      <ButtonView
        style={[customContainerStyle]}
        onPress={onPress || this.focus}
        disableRipple={disableRipple}>
        <View style={[styles.inputContainer, {borderBottomColor}, errorStyle]}>
          {leftText && !onLeftTextPress && (
            <Text
              size="small"
              color="secondary"
              style={{
                marginRight: Metrics.smallMargin,
                marginTop: Platform.OS === 'ios' ? Metrics.smallMargin / 4 : 0,
              }}>
              {leftText}
            </Text>
          )}

          {isCountryCode && (
            <CountryPicker
              visible={this.state.modalVisible}
              countryCode={this.state.countryData.cca2}
              // modal props
              withAlphaFilter={Platform.OS === 'ios'}
              withCallingCode
              withFilter
              // view props
              withCallingCodeButton={false}
              withFlagButton={false}
              autoFocusFilter={false}
              onSelect={value => {
                this.setState({
                  countryData: {
                    cca2: value.cca2,
                    callingCode: value.callingCode,
                  },
                });
              }}
              onClose={() => {
                this.setState({modalVisible: false});
              }}
            />
          )}

          {isCountryCode && (
            <ButtonView
              onPress={() => this.setState({modalVisible: true})}
              style={
                {
                  // height: '100%',
                  // paddingLeft: Metrics.smallMargin,
                  // paddingRight: Metrics.smallMargin / 2,
                  // paddingTop: Metrics.ratio(2),
                  // justifyContent: 'center',
                }
              }>
              <Text
                size="small"
                color="secondary"
                style={{
                  color: Colors.text.secondary,
                  marginLeft: 4,
                  fontSize: 18,
                  top: Platform.OS === 'ios' ? 1.5 : 0,
                }}>
                {`+${this.state.countryData.callingCode} -`}
              </Text>
            </ButtonView>
          )}

          <FloatLabelTextInputRN
            ref={ref => (this.input = ref)}
            noBorder="true"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor={Colors.text.secondary}
            secureTextEntry={this.state.showPassword}
            floatingStyle={styles.floatingStyle}
            inputStyle={styles.inputStyle}
            placeholder={placeholder}
            value={this.valueTextInput}
            onBlur={() => this.checkValidation()}
            onFocus={this.props.onFocusSet}
            onChangeTextValue={value => this.setTextInput(value)}
            blurOnSubmit={false}
            {...reset}
          />

          {secureTextEntry && (
            <ButtonView onPress={this.handleShowPassword}>
              {this.state?.showPassword ? (
                <Image style={styles.eyeIcon} source={Images.eye} />
              ) : (
                <Image style={styles.eyeIcon} source={Images.eyeCrossed} />
              )}
            </ButtonView>
          )}

          {rightText && (
            <ButtonView onPress={onRightTextPress}>
              <Text
                size="xxxSmall"
                color="secondary"
                type="lightItalic"
                style={[styles.rightText, rightTextStyle]}>
                {rightText}
              </Text>
            </ButtonView>
          )}
          {rightImage && (
            <Image source={rightImage} style={styles.rightImage} />
          )}
        </View>
        {showError && (
          <Text
            size="xSmall"
            color="error"
            style={{marginBottom: Metrics.ratio(10)}}>
            {messageError}
          </Text>
        )}
      </ButtonView>
    );
  }
}
