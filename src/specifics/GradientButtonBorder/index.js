import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import {DotsLoader} from 'react-native-indicator';
import {Metrics, Colors, ApplicationStyles} from '../../theme';

const styles = {
  container: {
    padding: Metrics.ratio(2),
    borderRadius: Metrics.borderRadius,
    marginBottom: Metrics.ratio(12),
  },
  // subContainer: {
  //   paddingHorizontal: Metrics.smallMargin,
  //   height: Metrics.ratio(48),
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderRadius: Metrics.borderRadius,
  // },
  subContainer: {
  paddingHorizontal: Metrics.ratio(2), 
   height: Metrics.ratio(48),
  paddingVertical: Metrics.ratio(2), 
  alignItems: 'center',
  justifyContent: 'center',
 borderRadius: Metrics.borderRadius
},
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {marginRight: Metrics.smallMargin},
};

export default class GradientButtonBorder extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    topContainer: PropTypes.any,
    style: PropTypes.any,
    onPress: PropTypes.func,
    textStyle: PropTypes.object,
    textContainerStyle: PropTypes.object,
    containerGradient: PropTypes.array,
    borderGradients: PropTypes.array,
    disable: PropTypes.bool,
    loading: PropTypes.bool,
    loadingColor: PropTypes.string,
  };

  static defaultProps = {
    title: 'Title',
    topContainer: {},
    style: {},
    onPress: undefined,
    textStyle: {textAlign: 'center'},
    textContainerStyle: {},
    containerGradients: Colors.gradients.primaryBg,
    borderGradients: Colors.gradients.primaryBgBorder,
    disable: false,
    loading: false,
    loadingColor: 'white',
  };

  render() {
    const {
      title,
      topContainer,
      style,
      onPress,
      textStyle,
      textContainerStyle,
      icon,
      containerGradients,
      borderGradients,
      disable,
      loading,
      loadingColor,
    } = this.props;

    const Container =
      onPress === undefined || disable || loading ? View : TouchableOpacity;
    return (
      <Container activeOpacity={0.6} onPress={onPress} style={topContainer}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={borderGradients}
          style={[styles.container, style]}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={containerGradients}
            style={styles.subContainer}>
            {loading ? (
              <DotsLoader color={loadingColor} />
            ) : (
              <View style={[styles.textWrapper, textContainerStyle]}>
                {icon && <Image source={icon} style={styles.image} />}
                <Text style={[ApplicationStyles.b17Primary, textStyle]}>
                  {title.toUpperCase()}
                </Text>
              </View>
            )}
          </LinearGradient>
        </LinearGradient>
      </Container>
    );
  }
}
