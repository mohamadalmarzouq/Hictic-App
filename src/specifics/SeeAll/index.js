import React from 'react';
import {View, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import {ButtonView} from '../../components';
import {ApplicationStyles, Metrics, Colors} from '../../theme';

const styles = {
  container: {
    backgroundColor: Colors.background.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Metrics.baseMargin * 1.25,
    paddingTop: Metrics.baseMargin,
  },
};

export default class SeeAll extends React.PureComponent {
  static propTypes = {
    icon: PropTypes.any,
    text: PropTypes.string,
    onPress: PropTypes.func,
    style: PropTypes.object,
  };

  static defaultProps = {
    icon: undefined,
    text: 'Title',
    onPress: undefined,
    style: {},
  };

  render() {
    const {icon, text, onPress, style} = this.props;
    return (
      <View style={[styles.container, style]}>
        {icon && (
          <Image source={icon} style={{marginRight: Metrics.baseMargin}} />
        )}
        <Text style={[ApplicationStyles.b20Secondary, ApplicationStyles.flex]}>
          {text}
        </Text>
        {onPress && (
          <ButtonView
            onPress={onPress}
            style={{
              paddingHorizontal: Metrics.baseMargin,
              paddingVertical: Metrics.smallMargin / 2,
            }}>
            <Text style={ApplicationStyles.re13Secondary}> See All</Text>
          </ButtonView>
        )}
      </View>
    );
  }
}
