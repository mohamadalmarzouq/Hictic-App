import React from 'react';
import {View, Image, Text} from 'react-native';
import {Metrics, ApplicationStyles} from '../../theme';

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: Metrics.ratio(20),
    height: Metrics.ratio(20),
    marginRight: Metrics.smallMargin,
  },
};

export default class IconText extends React.PureComponent {
  render() {
    const {icon, text, textStyle, style, disable} = this.props;
    return (
      <View style={[styles.container, style]}>
        {!disable && <Image style={styles.icon} source={icon} />}
        <Text style={[ApplicationStyles.re15Secondary, textStyle]}>{text}</Text>
      </View>
    );
  }
}
