import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, View, Text, TouchableOpacity, AppState} from 'react-native';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';
import {ApplicationStyles, Colors, Metrics} from '../../theme';

class CountDown extends React.Component {
  static propTypes = {
    digitBgColor: PropTypes.string,
    digitTxtColor: PropTypes.string,
    timeTxtColor: PropTypes.string,
    timeToShow: PropTypes.array,
    until: PropTypes.number,
    onFinish: PropTypes.func,
    onPress: PropTypes.func,
    isGradient: PropTypes.bool,
  };

  static defaultProps = {
    digitBgColor: Colors.background.tertiary,
    digitTxtColor: Colors.text.secondary,
    timeTxtColor: Colors.text.secondary,
    timeToShow: ['D', 'H', 'M', 'S'],
    labelD: 'd',
    labelH: 'h',
    labelM: 'm',
    labelS: 's',
    until: 0,
    isGradient: false,
  };

  state = {
    until: Math.max(this.props.until, 0),
    wentBackgroundAt: null,
  };

  appStateSubscription = null;
  componentDidMount() {
    if (this.props.onFinish) {
      this.onFinish = _.once(this.props.onFinish);
    }
    this.timer = setInterval(this.updateTimer, 1000);
    this.appStateSubscription = AppState.addEventListener(
      'change',
      this._handleAppStateChange,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
    this.appStateSubscription?.remove();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.until !== nextProps.until) {
      this.setState({
        until: Math.max(nextProps.until, 0),
      });
      if (!this.timer) {
        this.timer = setInterval(this.updateTimer, 1000);
      }
    }
  }

  _handleAppStateChange = currentAppState => {
    const {until, wentBackgroundAt} = this.state;
    if (currentAppState === 'active' && wentBackgroundAt) {
      const diff = (Date.now() - wentBackgroundAt) / 1000.0;
      this.setState({until: Math.max(0, until - diff)});
    }
    if (currentAppState === 'background') {
      this.setState({wentBackgroundAt: Date.now()});
    }
  };

  getTimeLeft = () => {
    const {until} = this.state;
    return {
      seconds: until % 60,
      minutes: parseInt(until / 60, 10) % 60,
      hours: parseInt(until / (60 * 60), 10) % 24,
      days: parseInt(until / (60 * 60 * 24), 10),
    };
  };

  updateTimer = () => {
    const {until} = this.state;

    if (until <= 1) {
      clearInterval(this.timer);
      this.timer = null;
      this.setState({until: 0});
      if (this.onFinish) {
        this.onFinish();
      }
    } else {
      this.setState({until: until - 1});
    }
  };

  renderDigit = (label, d) => {
    const {timeTxtColor, digitBgColor, digitTxtColor, isGradient} = this.props;

    if (isGradient) {
      return (
        <LinearGradient
          style={[styles.digitCont, {backgroundColor: digitBgColor}]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={Colors.gradients.primaryBg}>
          <Text style={[ApplicationStyles.b15Secondary, {color: timeTxtColor}]}>
            {d}
          </Text>
          <Text
            style={[
              ApplicationStyles.m10Secondary,
              styles.timeTxt,
              {color: digitTxtColor},
            ]}>
            {label}
          </Text>
        </LinearGradient>
      );
    }

    return (
      <View style={[styles.digitCont, {backgroundColor: digitBgColor}]}>
        <Text style={[ApplicationStyles.b15Secondary, {color: timeTxtColor}]}>
          {d}
        </Text>
        <Text
          style={[
            ApplicationStyles.m10Secondary,
            styles.timeTxt,
            {color: digitTxtColor},
          ]}>
          {label}
        </Text>
      </View>
    );
  };

  renderDigitWithoutBg = (label, d, divider = '') => {
    return (
      <Text
        style={ApplicationStyles.b15Primary}>{`${d}${label}${divider}`}</Text>
    );
  };

  renderDays = day => {
    return <Text style={ApplicationStyles.b15Primary}>{`${day} Days`}</Text>;
  };

  renderCountDown = () => {
    const {timeToShow} = this.props;
    const {until} = this.state;
    const {days, hours, minutes, seconds} = this.getTimeLeft();
    const newTime = sprintf(
      '%01d:%01d:%01d:%01d',
      days,
      hours,
      minutes,
      seconds,
    ).split(':');
    const Component = this.props.onPress ? TouchableOpacity : View;

    if (days > 0) {
      return this.renderDays(days);
    }

    return (
      <Component style={styles.timeCont} onPress={this.props.onPress}>
        {_.includes(timeToShow, 'D')
          ? this.renderDigitWithoutBg(this.props['labelD'], newTime[0], ' : ')
          : null}
        {_.includes(timeToShow, 'H')
          ? this.renderDigitWithoutBg(this.props['labelH'], newTime[1], ' : ')
          : null}
        {_.includes(timeToShow, 'M')
          ? this.renderDigitWithoutBg(this.props['labelM'], newTime[2], ' : ')
          : null}
        {_.includes(timeToShow, 'S')
          ? this.renderDigitWithoutBg(this.props['labelS'], newTime[3])
          : null}
      </Component>
    );
  };

  render() {
    return <View style={this.props.style}>{this.renderCountDown()}</View>;
  }
}

const styles = StyleSheet.create({
  timeCont: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timeTxt: {marginBottom: Metrics.ratio(-3)},
  digitCont: {
    width: Metrics.ratio(37),
    height: Metrics.ratio(27),
    flexDirection: 'row',
    borderRadius: Metrics.ratio(4),
    marginHorizontal: Metrics.ratio(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = CountDown;
