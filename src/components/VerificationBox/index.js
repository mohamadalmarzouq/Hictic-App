// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TextInput, View} from 'react-native';

import styles from './styles';
import {Colors} from '../../theme';

export default class VerificationBox extends Component {
  static propTypes = {
    numberOfInputBoxs: PropTypes.number.isRequired,
    containerStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.any,
    ]),
    customInputStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.any,
    ]),
    onComplete: PropTypes.func.isRequired,
  };

  static defaultProps = {containerStyle: {}, customInputStyle: {}};

  constructor(props) {
    super(props);

    this.references = [];
    this.values = [];
    const {numberOfInputBoxs} = props;

    for (let i = 0; i < numberOfInputBoxs; i += 1) {
      this.values[i] = '';
    }
  }

  getValue = () => this.values.join('');

  clear = () => {
    const {numberOfInputBoxs} = this.props;
    for (let i = 0; i < numberOfInputBoxs; i += 1) {
      this.references[i].setNativeProps({text: ''});
      //this.references[i].clear();
      this.values[i] = '';
    }
    //this.references[0].focus();
  };

  // _onChangeText = (text, index) => {
  //   const totalBoxesLength = this.values.length - 1;
  //   const {onComplete} = this.props;
  //   if (index !== totalBoxesLength && text.length > 0) {
  //     for (let i = index + 1; i <= totalBoxesLength; i += 1) {
  //       if (this.values[i] === '' || index === totalBoxesLength) {
  //         this.references[i].focus();
  //         break;
  //       }
  //     }
  //     this.values[index] = text;
  //   } else if (index === totalBoxesLength && text.length > 0) {
  //     this.values[index] = text;
  //     this.references[index].blur();
  //     onComplete(this.values.join(''));
  //   }
  // };

  _onChangeText = (text, index) => {
    const totalBoxesLength = this.values.length;
    const {onComplete} = this.props;

    this.values[index] = text;

    if (text.length > 0) {
      // Move to next input if not last
      if (index < totalBoxesLength - 1) {
        this.references[index + 1].focus();
      } else {
        // Last box, complete input
        this.references[index].blur();
        onComplete(this.values.join(''));
      }
    }
  };

  _onKeyPress = ({nativeEvent}, index) => {
    if (nativeEvent.key === 'Backspace') {
      if (index > 0) {
        this.references[index - 1].focus();
      }
    }
  };

  _onFocus = index => {
    if (index !== 0) {
      let minimumEmptyIndex = index;
      for (let i = index; i >= 0; i -= 1) {
        if (this.values[i] === '') {
          minimumEmptyIndex = i;
        }
      }
      if (minimumEmptyIndex !== index) {
        this.references[minimumEmptyIndex].focus();
      }
    }
  };

  _renderInputBox = (item, index) => {
    const {customInputStyle} = this.props;
    //const focus = index === 0;
    //autoFocus={focus}
    return (
      <TextInput
        underlineColorAndroid="transparent"
        keyboardType="numeric"
        maxLength={1}
        selectionColor={Colors.text.selectionColor}
        autoCapitalize="none"
        autoCorrect={false}
        key={index}
        onKeyPress={e => this._onKeyPress(e, index)}
        ref={ref => {
          this.references[index] = ref;
        }}
        // onFocus={() => this._onFocus(index)}
        onChangeText={text => this._onChangeText(text, index)}
        style={[
          styles.input,
          customInputStyle,
          index === this.values.length - 1 ? {marginRight: 0} : {},
        ]}
      />
    );
  };

  render() {
    const {containerStyle} = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        {this.values.map(this._renderInputBox)}
      </View>
    );
  }
}
