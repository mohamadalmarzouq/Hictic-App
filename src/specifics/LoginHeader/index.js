import React from 'react';
import {View, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import {ApplicationStyles, Metrics, Colors} from '../../theme';

const styles = {
  container: {
    backgroundColor: Colors.background.primary,
    paddingTop: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
  },
  imageStyle: {alignSelf: 'center', marginTop: Metrics.doubleBaseMargin},
  descriptionStyle: {marginTop: Metrics.smallMargin},
};

export default class LoginHeader extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    image: PropTypes.number,
    description: PropTypes.string,
    containerStyle: PropTypes.object,
  };

  static defaultProps = {
    title: 'Title',
    image: 0,
    description: '',
    containerStyle: {},
  };

  render() {
    const {title, image, description, containerStyle} = this.props;

    return (
      <View style={[styles.container, containerStyle]}>
        <Text style={ApplicationStyles.b30Secondary}>{title}</Text>
        {image > 0 && <Image style={styles.imageStyle} source={image} />}
        {description !== '' && (
          <Text
            style={[ApplicationStyles.re17Secondary, styles.descriptionStyle]}>
            {description}
          </Text>
        )}
      </View>
    );
  }
}
