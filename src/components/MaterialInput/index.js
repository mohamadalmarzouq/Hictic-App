import React, {PureComponent} from 'react';
import {View, Text, TextInput, Animated, Easing, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {Metrics} from '../../theme';

class MaterialInput extends PureComponent {
  static propTypes = {
    textInputStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    activeColor: PropTypes.string,
    inActiveColor: PropTypes.string,
    errorColor: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    textInputContainerStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    textInputProps: PropTypes.object,
  };
  static defaultProps = {
    textInputStyle: {
      fontSize: 16,
      padding: Metrics.baseMargin,
    },
    activeColor: '#2962FF',
    errorColor: '#e53935',
    inActiveColor: '#E0E0E0',
    placeholder: 'placeholder',
    placeholderStyle: {},
    textInputContainerStyle: {},
    textInputProps: {},
  };

  constructor(props) {
    super(props);
    this.animationValue = new Animated.Value(0);
  }

  animateUp = () => {
    Animated.timing(this.animationValue, {
      toValue: 1,
      duration: 600,
      easing: Easing.bezier(0.19, 1, 0.22, 1),
      useNativeDriver: true,
    }).start();
  };

  animateDown = () => {
    Animated.timing(this.animationValue, {
      toValue: 0,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  state = {
    textInputWrapperHeight: 0,
    isActive: false,
    isError: false,
    value: '',
  };

  renderPlaceholder() {
    const compHeight =
      this.state.textInputWrapperHeight / (Platform.OS === 'android' ? 2 : 1.8);
    const scale = {
      scale: this.animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.8],
      }),
    };
    const translateY = {
      translateY: this.animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [compHeight, 0],
      }),
    };
    const translateX = {
      translateX: this.animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -this.props.textInputStyle.fontSize / 1.2],
      }),
    };
    return this.state.textInputWrapperHeight > 0 ? (
      <Animated.Text
        style={[
          styles.placeholderText,
          {
            left: this.props.textInputStyle.padding,
            color:
              this.state.isActive && !this.state.isError
                ? this.props.activeColor
                : this.state.isError
                ? this.props.errorColor
                : this.props.inActiveColor,
          },
          {
            transform: [scale, translateY, translateX],
          },
          this.props.placeholderStyle,
        ]}>
        {this.props.placeholder}
      </Animated.Text>
    ) : null;
  }

  onLayout = ev =>
    this.setState({
      textInputWrapperHeight: ev.nativeEvent.layout.height,
    });
  onFocus = () => {
    this.setState({isActive: true}, () => this.animateUp());
  };
  onBlur = () => {
    if (!this.state.value.length) {
      this.setState({isActive: false}, () => this.animateDown());
    }
  };
  onValue = text => {
    this.state.value = text;
    this.state.isError && this.setError(false);
  };
  setFocus = () => this.textInput.focus();
  setError = isError => this.setState({isError: false});
  getText = () => this.state.value;

  render() {
    return (
      <View style={{backgroundColor: 'white'}}>
        <View
          style={[
            styles.textInputWrapper,
            {
              marginTop: this.props.textInputStyle.fontSize / 1.5,
            },
            {
              borderColor:
                this.state.isActive && !this.state.isError
                  ? this.props.activeColor
                  : this.state.isError
                  ? this.props.errorColor
                  : this.props.inActiveColor,
            },
            this.props.textInputContainerStyle,
          ]}
          onLayout={this.onLayout}>
          <TextInput
            style={{...this.props.textInputStyle}}
            ref={ref => (this.textInput = ref)}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChangeText={this.onValue}
            {...this.props.textInputProps}
          />
        </View>
        {this.renderPlaceholder()}
      </View>
    );
  }
}

const styles = {
  placeholderText: {
    backgroundColor: 'white',
    position: 'absolute',
    paddingHorizontal: Metrics.smallMargin,
    color: '#BDBDBD',
  },
  textInputWrapper: {
    borderColor: '#E0E0E0',
    borderWidth: Metrics.ratio(2),
  },
};

export default MaterialInput;
