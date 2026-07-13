import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {GradientBackground} from '../../specifics';
import {Image as RNImage, ButtonView} from '../../components';
import {Colors, ApplicationStyles, Metrics, Images} from '../../theme';

const styles = StyleSheet.create({
  container: {
    shadowColor: 'rgba(0, 0, 0, 0.23)',
    shadowOffset: {
      width: 0,
      height: Metrics.ratio(2),
    },
    shadowRadius: Metrics.smallMargin,
    shadowOpacity: Metrics.ratio(1),
    elevation: 1,
  },
});
export default class RoundImage extends React.Component {
  static propTypes = {
    containerStyle: PropTypes.any,

    image: PropTypes.string,
    imageStyle: PropTypes.any,
    imageSize: PropTypes.number,
    imageBorderWidth: PropTypes.number,
    imageBorderColor: PropTypes.string,

    smallCircleStyle: PropTypes.any,
    miniCircleText: PropTypes.any,
    miniCircleIcon: PropTypes.number,
    circleSize: PropTypes.number,
    circleBorderWidth: PropTypes.number,
    circleBorderColor: PropTypes.string,
    circeBackgroundColor: PropTypes.string,

    iconStyle: PropTypes.object,

    hideShadow: PropTypes.bool,
    isUser: PropTypes.bool,
    isRightIconTapAble: PropTypes.bool,
    resizeMode: PropTypes.string,
  };

  static defaultProps = {
    containerStyle: {},

    image: '',
    imageStyle: {},
    imageSize: Metrics.ratio(102),
    imageBorderWidth: Metrics.ratio(6),
    imageBorderColor: Colors.background.quaternary,

    miniCircleText: '',
    miniCircleIcon: -1,
    smallCircleStyle: {},
    circleSize: Metrics.ratio(32),
    circleBorderWidth: Metrics.ratio(3),
    circleBorderColor: Colors.background.primary,
    circeBackgroundColor: Colors.background.senary,

    iconStyle: {},

    hideShadow: false,
    isRightIconTapAble: false,
    resizeMode: 'contain',
  };

  renderImage = () => {
    const {
      image,
      imageStyle,
      imageSize,
      imageBorderWidth,
      imageBorderColor,
      isUser,
      resizeMode,
      ...rest
    } = this.props;

    const imageStyleComponent = [
      {
        // width: Metrics.ratio(imageSize),
        height: Metrics.ratio(imageSize),
        borderRadius: Metrics.ratio(imageSize) / 2,
        borderWidth: Metrics.ratio(imageBorderWidth),
        borderColor: imageBorderColor,
        overflow: 'hidden',
        backgroundColor: '#fff',
      },
      imageStyle,
    ];

    return (
      <RNImage
        isShowActivity={false}
        source={
          image !== null && image
            ? {
                uri: image,
              }
            : isUser
            ? Images.emptyImages.user
            : Images.emptyImages.emptyImage
          // Images.tabs.myprofile
        }
        style={imageStyleComponent}
        placeholderStyle={{
          width: isUser
            ? Metrics.ratio(imageSize)
            : Metrics.ratio(imageSize) / 1.5,
          height: isUser
            ? Metrics.ratio(imageSize)
            : Metrics.ratio(imageSize) / 1.5,
        }}
        placeholderSource={
          isUser ? Images.emptyImages.user : Images.emptyImages.emptyImage
        }
        resizeMode={resizeMode}
        {...rest}
      />
    );
  };

  renderCircle = () => {
    const {
      smallCircleStyle,
      miniCircleText,
      miniCircleIcon,
      circleSize,
      circleBorderWidth,
      circleBorderColor,
      circeBackgroundColor,
    } = this.props;
    if (miniCircleText !== '' || miniCircleIcon !== -1) {
      return (
        <View
          style={[
            {
              position: 'absolute',
              top: 0,
              right: 0,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: circeBackgroundColor,
              width: Metrics.ratio(circleSize),
              height: Metrics.ratio(circleSize),
              borderRadius: Metrics.ratio(circleSize) / 2,
              borderWidth: Metrics.ratio(circleBorderWidth),
              borderColor: circleBorderColor,
            },
            smallCircleStyle,
          ]}>
          {miniCircleText !== '' && (
            <Text style={ApplicationStyles.m16White}>{miniCircleText}</Text>
          )}
          {miniCircleIcon !== -1 && (
            <Image
              source={miniCircleIcon}
              style={{
                width: Metrics.ratio(24),
                height: Metrics.ratio(16),
              }}
            />
          )}
        </View>
      );
    } else {
      null;
    }
  };

  renderIcon = () => {
    const {rightIcon, iconStyle, isRightIconTapAble, onPressRightIcon} =
      this.props;

    if (rightIcon)
      return isRightIconTapAble ? (
        <ButtonView
          onPress={onPressRightIcon}
          style={[{position: 'absolute', right: 0}, iconStyle]}>
          <Image source={rightIcon} />
        </ButtonView>
      ) : (
        <Image
          source={rightIcon}
          style={[{position: 'absolute', right: 0}, iconStyle]}
        />
      );
    else null;
  };

  render() {
    const {
      containerStyle,
      imageSize,
      imageBorderWidth,
      hideShadow,
      onPress,
      disabledOpacity,
    } = this.props;

    const isDisabled = !onPress;
    return (
      <ButtonView
        onPress={onPress}
        disabled={isDisabled}
        disabledOpacity={disabledOpacity ?? 1}
        style={[
          hideShadow ? {} : styles.container,
          {width: Metrics.ratio(imageSize) + Metrics.ratio(imageBorderWidth)},
          containerStyle,
        ]}>
        {this.renderImage()}
        {this.renderCircle()}
        {this.renderIcon()}
      </ButtonView>
    );
  }
}
