import React from 'react';
import {Actions} from 'react-native-router-flux';
import {Image} from 'react-native';
import PropTypes from 'prop-types';
import {ButtonView} from '../';
import {Images, Colors, Metrics} from '../../theme';
import { navGoBack } from '../../navigator';

export default class BackButton extends React.PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
    image: PropTypes.number,
    tintColor: PropTypes.string,
    style: PropTypes.object,
    imageStyle: PropTypes.object,
  };

  static defaultProps = {
    // onPress: () => Actions.pop(),
    onPress: () => navGoBack(),
    image: Images.back,
    tintColor: Colors.navbar.iconTintSecondary,
    style: {},
    imageStyle: {},
  };

  render() {
    const {onPress, image, tintColor, style, imageStyle} = this.props;
    return (
      <ButtonView
        style={[
          {
            paddingHorizontal: Metrics.baseMargin,
            paddingVertical: Metrics.baseMargin,
          },
          style,
        ]}
        onPress={onPress}>
        <Image source={image} style={[{tintColor: tintColor}, imageStyle]} />
      </ButtonView>
    );
  }
}
