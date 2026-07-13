import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import {ApplicationStyles, Metrics, Images, Colors} from '../../theme';
import {ViewLayer} from '../../components';
import Utils from '../../utils';

const styles = {
  container: {
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin * 1.25,
    backgroundColor: Colors.background.nonary,
  },
  descriptionStyle: {
    marginTop: Metrics.smallMargin / 2,
    maxWidth: Metrics.screenWidth / 1.5,
  },
};

export default class CustomAd extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  };

  _adPress = () => {
    let {link} = this.props;

    if (!link.includes('http')) link = 'http://' + link;

    Linking.openURL(link);
  };

  render() {
    const {title, description, image} = this.props;
    return (
      <TouchableOpacity onPress={this._adPress} activeOpacity={0.5}>
        <ImageBackground
          style={styles.container}
          source={{uri: Utils.getImagePath(image)}}
          resizeMethod="resize">
          <ViewLayer
            style={{
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}
          />
          <Text style={ApplicationStyles.b17Primary}>{title}</Text>
          <Text
            style={[ApplicationStyles.re15Primary, styles.descriptionStyle]}>
            {description}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}
