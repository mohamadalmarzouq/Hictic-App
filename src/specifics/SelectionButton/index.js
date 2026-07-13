import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {ButtonView} from '../../components';
import {ApplicationStyles, Metrics, Colors} from '../../theme';

const styles = {
  container: {
    height: Metrics.ratio(50),
    borderRadius: Metrics.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: Metrics.ratio(1),
  },
};

export default class SelectionButton extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    isSelected: PropTypes.bool,
    style: PropTypes.object,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    title: 'Title',
    onPress: undefined,
    isSelected: false,
    style: {},
    disabled: false,
  };

  render() {
    const {title, onPress, isSelected, style, disabled} = this.props;

    const borderColor = isSelected
      ? Colors.background.quaternary
      : Colors.background.secondary;

    const textStyle = isSelected
      ? ApplicationStyles.b17Senary
      : ApplicationStyles.b17Secondary;

    const Container = onPress === undefined ? View : ButtonView;

    return (
      <Container
        style={[
          styles.container,
          {
            borderColor: disabled ? Colors.disable : borderColor,
          },
          style,
        ]}
        onPress={onPress}>
        <Text style={disabled ? ApplicationStyles.b17Disable : textStyle}>
          {title}
        </Text>
      </Container>
    );
  }
}
