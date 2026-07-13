// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';
import styles from './styles';
import {Text, ButtonView} from '../../components';
import FloatLabelTextInputRN from './multiline';
import {Colors, Metrics} from '../../theme';
import Util from '../../utils';

export default class FloatLabelTextInputMultiline extends React.PureComponent {
  static propTypes = {
    secureTextEntry: PropTypes.bool,
    initialValue: PropTypes.string,
    rightText: PropTypes.string,
    onRightTextPress: PropTypes.func,
    placeholder: PropTypes.string.isRequired,
    customContainerStyle: PropTypes.any,
    rightImage: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    errorMessage: PropTypes.string,
    valueText: PropTypes.string,
    fixedHeight: PropTypes.bool,
  };

  static defaultProps = {
    secureTextEntry: false,
    initialValue: '',
    onRightTextPress: () => {},
    rightText: undefined,
    customContainerStyle: {},
    rightImage: undefined,
    errorMessage: 'Field can not be empty',
    valueText: '',
    fixedHeight: true,
  };

  constructor(props) {
    super(props);
    this.valueTextInput = props.valueText;
  }

  focus = () => {
    this.input?.focus();
  };

  getText = () => {
    return this.input?.getText();
  };

  setText = text => {
    this.input?.setText(text);
    this.setTextInput(text);
  };

  setTextInput = text => {
    this.valueTextInput = text;
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
      this.input?.focus();
    }

    if (isFormSubmit) {
      this.setState({showError: true});
    }

    return false;
  };

  checkValidationWithText = () => {
    const {errorType, isEmptyValid} = this.props;
    const text = this.input?.getText();
    if (isEmptyValid && (!text || text === '')) {
      return true;
    } else if (errorType === 'required' && text) {
      return true;
    } else if (errorType === 'email' && Util.validateEmail(text)) {
      return true;
    } else if (errorType === 'password' && Util.validatePassword(text)) {
      return true;
    }
    return false;
  };

  state = {
    showError: false,
  };

  valueTextInput = '';

  render() {
    const {
      rightImage,
      rightText,
      onRightTextPress,
      customContainerStyle,
      placeholder,
      errorMessage,
      secureTextEntry,
      ...reset
    } = this.props;

    const {showError} = this.state;

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

    return (
      <View style={[customContainerStyle]}>
        <View style={[styles.inputContainer, {borderBottomColor}, errorStyle]}>
          <FloatLabelTextInputRN
            ref={ref => (this.input = ref)}
            noBorder="true"
            autoCapitalize="none"
            autoCorrect={false}
            onBlur={() => this.checkValidation()}
            placeholderTextColor={Colors.text.secondary}
            onChangeTextValue={this._onChangeText}
            secureTextEntry={secureTextEntry}
            floatingStyle={styles.floatingStyle}
            inputStyle={styles.inputStyle}
            placeholder={placeholder}
            value={this.valueTextInput}
            onChangeTextValue={value => this.setTextInput(value)}
            selectionColor={Colors.text.selectionColor}
            {...reset}
          />

          {rightText && (
            <ButtonView onPress={onRightTextPress}>
              <Text size="xxSmall" color="secondary" style={styles.rightText}>
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
            {errorMessage}
          </Text>
        )}
      </View>
    );
  }
}
