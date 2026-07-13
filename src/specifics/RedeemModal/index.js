import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import {View, Text} from 'react-native';

import {Button, FloatLabelTextInput} from '../../components';
import {GradientButtonBorder, SelectionButton} from '../';
import styles from './styles';
import {Colors, ApplicationStyles, Metrics, Strings} from '../../theme';
import Utils from '../../utils';

export default class RedeemModal extends React.PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    couponCode: PropTypes.any,
    error: PropTypes.string,
  };

  static defaultProps = {
    loading: false,
    couponCode: '',
    error: '',
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

    const inputFields = [this.branchCodeInput];
    if (Utils.validateFields(inputFields)) {
      this.branchCodeInput.blur();
      onPress(this.branchCodeInput.getText());
    }
  };

  _renderTitle = () => {
    return (
      <Text
        style={[ApplicationStyles.b30Secondary, styles.titleStyle]}
        numberOfLines={3}>
        Redeem Reward
      </Text>
    );
  };

  _renderDescription = () => {
    return (
      <Text
        style={[ApplicationStyles.re17Secondary, styles.descriptionStyle]}
        numberOfLines={3}>
        Make sure you reveal the code when you need to use it. The code cannot
        be reused
      </Text>
    );
  };

  _renderBranchInput = () => {
    return (
      <FloatLabelTextInput
        ref={ref => {
          this.branchCodeInput = ref;
        }}
        returnKeyType="done"
        errorType="required"
        errorMessage={Strings.errorMessageBranchCode}
        placeholder={Strings.branch_code}
        customContainerStyle={styles.inputField}
        onSubmitEditing={this._onButtonPress}
      />
    );
  };

  _renderBars = () => {
    return (
      <Text
        ellipsizeMode="clip"
        style={[ApplicationStyles.sb17Tertiary]}
        numberOfLines={1}>
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      </Text>
    );
  };

  _renderCouponView = () => {
    const {couponCode} = this.props;
    return (
      <View style={styles.couponView}>
        {this._renderBars()}
        <Text
          style={[ApplicationStyles.re15Secondary, styles.couponTitle]}
          numberOfLines={1}>
          REWARD CODE
        </Text>

        <Text
          style={[ApplicationStyles.b40Octonary, styles.couponCode]}
          numberOfLines={2}>
          {couponCode ? couponCode : '* * * * *'}
        </Text>
        {this._renderBars()}
      </View>
    );
  };

  _renderButtons = () => {
    const {loading, couponCode} = this.props;

    return (
      <View style={styles.buttonContainer}>
        <GradientButtonBorder
          title="CANCEL"
          topContainer={ApplicationStyles.flex}
          style={{
            marginRight: Metrics.smallMargin / 2,
          }}
          onPress={this.hide}
          containerGradients={Colors.gradients.white}
          borderGradients={Colors.gradients.secondaryBorder}
          textStyle={ApplicationStyles.b17Secondary}
        />

        <GradientButtonBorder
          title={couponCode ? 'DONE' : 'REDEEM'}
          topContainer={ApplicationStyles.flex}
          style={{
            marginLeft: Metrics.smallMargin / 2,
          }}
          onPress={couponCode ? this.hide : this._onButtonPress}
          loading={loading}
        />
      </View>
    );
  };

  _renderError = () => {
    const {error} = this.props;
    if (error) {
      return (
        <Text style={[ApplicationStyles.re15Error, styles.errorStyle]}>
          {error}
        </Text>
      );
    }
    return null;
  };

  render() {
    const {isVisible} = this.state;

    return (
      <Modal
        isVisible={isVisible}
        style={styles.modal}
        // animationIn="fadeIn"
        // animationOut="fadeOut"
        onBackdropPress={this.hide}
        onBackButtonPress={this.hide}
        useNativeDriver>
        <View style={styles.body}>
          {this._renderTitle()}
          {this._renderDescription()}
          {this._renderBranchInput()}
          {this._renderCouponView()}
          {this._renderButtons()}
          {this._renderError()}
        </View>
      </Modal>
    );
  }
}
