import React, {PureComponent} from 'react';
import {View, Text, Image} from 'react-native';
import {ButtonView} from '../../components';
import PropTypes from 'prop-types';
import {Metrics, Colors, ApplicationStyles} from '../../theme';

const styles = {
  container: {
    backgroundColor: Colors.borders.primary,
    borderRadius: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin * 1.25,
    paddingBottom: Metrics.ratio(5),
    marginBottom: Metrics.ratio(12),
  },
  textWrapper: {
    height: Metrics.ratio(57),
    paddingTop: Metrics.ratio(5),
    paddingHorizontal: Metrics.baseMargin,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Metrics.smallMargin,
    backgroundColor: Colors.background.primary,
    flexDirection: 'row',
  },
  image: {
    width: Metrics.ratio(70),
    height: Metrics.ratio(70),
    resizeMode: 'cover',
    position: 'absolute',
    left: Metrics.ratio(2),
    top: Metrics.ratio(2),
  },
};

class CustomButton extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    style: PropTypes.any,
    onPress: PropTypes.func,
    textStyle: PropTypes.object,
    textContainerStyle: PropTypes.object,
  };

  static defaultProps = {
    style: {},
    onPress: undefined,
    textStyle: {flex: 1, textAlign: 'center'},
    textContainerStyle: {},
  };

  render() {
    const {style, onPress, textStyle, textContainerStyle, image} = this.props;
    return (
      <ButtonView style={[styles.container, style]} onPress={onPress}>
        <View style={[styles.textWrapper, textContainerStyle]}>
          {image && <Image source={image} style={styles.image} />}
          <Text style={[ApplicationStyles.b18Secondary, textStyle]}>
            {this.props.title.toUpperCase()}
          </Text>
        </View>
      </ButtonView>
    );
  }
}

export default CustomButton;
