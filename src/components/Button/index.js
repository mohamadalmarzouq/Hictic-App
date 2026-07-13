// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native';
import {Text} from '../';
import styles from './styles';
import {Metrics, Images, Fonts, Colors} from '../../theme';

let disableOnPress = false;

const debounceTime = Platform.select({
  ios: 200,
  android: 700,
});

function _onPress(onPress) {
  if (!disableOnPress) {
    disableOnPress = true;
    if (onPress) {
      onPress();
    }

    setTimeout(() => {
      disableOnPress = false;
    }, debounceTime);
  }
}

function renderInnerText(
  title,
  color,
  size,
  type,
  textStyle,
  isLoading,
  indicatorColor,
  textAlign,
) {
  if (isLoading) {
    return (
      <ActivityIndicator
        animating
        size="small"
        style={styles.spinner}
        color={indicatorColor}
      />
    );
  }

  return (
    <Text
      color={color}
      size={size}
      type={type}
      textAlign={textAlign}
      style={textStyle}>
      {title}
    </Text>
  );
}

function renderIcon(icon, iconRight) {
  if (!icon) {
    return null;
  }

  let positionStyle = {left: Metrics.smallMargin};
  if (iconRight) {
    positionStyle = {right: Metrics.smallMargin};
  }
  return (
    <Image
      resizeMode="contain"
      source={Images[icon]}
      style={[styles.icon, positionStyle]}
    />
  );
}

const Button = (props) => {
  const {
    style,
    color,
    size,
    type,
    icon,
    onPress,
    raised,
    iconRight,
    children,
    disabled,
    textAlign,
    isLoading,
    textStyle,
    background,
    indicatorColor,
    ...rest
  } = props;

  const buttonStyle = StyleSheet.flatten([
    styles.button,
    raised && {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,

      elevation: 1,
    },
    {
      backgroundColor: Colors.background[background] || background,
    },
    style,
    disabled && styles.opacity,
  ]);

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        disabled={disabled}
        {...rest}
        onPress={() => _onPress(onPress)}>
        <View style={buttonStyle}>
          {renderInnerText(
            children,
            color,
            size,
            type,
            textStyle,
            isLoading,
            indicatorColor,
            textAlign,
          )}
          {renderIcon(icon, iconRight)}
        </View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      style={buttonStyle}
      {...rest}
      onPress={() => _onPress(onPress)}>
      {renderInnerText(
        children,
        color,
        size,
        type,
        textStyle,
        isLoading,
        indicatorColor,
        textAlign,
      )}
      {renderIcon(icon, iconRight)}
    </TouchableOpacity>
  );
};

Button.propTypes = {
  icon: PropTypes.string,
  raised: PropTypes.bool,
  iconRight: PropTypes.bool,
  style: PropTypes.any,
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(_.keys(Fonts.size)),
    PropTypes.number,
  ]),
  onPress: PropTypes.func,
  background: PropTypes.string,
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(_.keys(Fonts.type)),
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  textStyle: PropTypes.any,
  indicatorColor: PropTypes.string,
  textAlign: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
};

Button.defaultProps = {
  style: {},
  Size: 'normal',
  type: 'bold',
  icon: undefined,
  color: 'primary',
  raised: false,
  onPress: () => {},
  iconRight: false,
  disabled: false,
  isLoading: false,
  indicatorColor: 'black',
  textAlign: 'center',
  background: 'secondary',
  textStyle: {flex: 1},
};

export default Button;
