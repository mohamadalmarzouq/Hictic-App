import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import {View, Text} from 'react-native';

import {Button} from '../../components';
import {GradientButtonBorder, SelectionButton} from '../';
import styles from './styles';
import {Colors, ApplicationStyles, Metrics} from '../../theme';

export default class MessageModal extends React.PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    rightButtonTitle: PropTypes.string,
    leftButtonTitle: PropTypes.string,
    isCancelable: PropTypes.bool,
  };

  static defaultProps = {
    rightButtonTitle: 'Ok',
    leftButtonTitle: 'Cancel',
    isLoading: false,
    isCancelable: false,
  };

  state = {
    isVisible: false,
  };

  componentWillReceiveProps(nextProps: Object) {
    if (this.props.isLoading && !nextProps.isLoading) {
      this.state.isVisible = false;
    }
  }

  show() {
    this.setState({isVisible: true});
  }

  hide = () => {
    this.setState({
      isVisible: false,
    });
  };

  _onButtonPress = () => {
    const {onPress} = this.props;
    onPress();
  };

  _renderButtons = () => {
    const {rightButtonTitle, leftButtonTitle, isCancelable} = this.props;

    return (
      <View style={styles.flexRow}>
        {isCancelable && (
          <GradientButtonBorder
            title={leftButtonTitle}
            topContainer={ApplicationStyles.flex}
            style={{
              marginRight: Metrics.smallMargin / 2,
            }}
            onPress={this.hide}
            containerGradients={Colors.gradients.white}
            borderGradients={Colors.gradients.secondaryBorder}
            textStyle={ApplicationStyles.b17Secondary}
          />
        )}

        <GradientButtonBorder
          title={rightButtonTitle}
          topContainer={ApplicationStyles.flex}
          style={{
            marginLeft: isCancelable ? Metrics.smallMargin / 2 : 0,
          }}
          onPress={this._onButtonPress}
        />
      </View>
    );
  };

  render() {
    const {description} = this.props;
    const {isVisible} = this.state;

    return (
      <Modal
        isVisible={isVisible}
        style={styles.modal}
        // animationIn="fadeIn"
        // animationOut="fadeOut"
        onBackdropPress={this.hide}
        onBackButtonPress={this.hide}
        useNativeDriver={false}>
        <View style={styles.body}>
          <Text
            style={[ApplicationStyles.re22Secondary, styles.descriptionStyle]}
            numberOfLines={3}>
            {description}
          </Text>

          {this._renderButtons()}
        </View>
      </Modal>
    );
  }
}
