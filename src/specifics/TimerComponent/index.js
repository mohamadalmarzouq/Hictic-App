import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {RoundImage, CountDown} from '../';
import {ApplicationStyles, Metrics, Colors} from '../../theme';
import Utils from '../../utils';
import {DATE_TIME_FORMAT3} from '../../constants';

export default class TimerComponent extends React.Component {
  state = {
    counterUpdate: false,
  };

  _updateCounter = () => {
    const {callBack} = this.props;
    setTimeout(() => {
      this.setState(
        {
          counterUpdate: !this.state.counterUpdate,
        },
        () => {
          if (callBack) {
            callBack();
          }
        },
      );
    }, 1000);
  };

  static propTypes = {
    image: PropTypes.string,
    digitBgColor: PropTypes.string,
    digitTxtColor: PropTypes.string,
    timeTxtColor: PropTypes.string,
    style: PropTypes.object,
    hideText: PropTypes.bool,
    isGradient: PropTypes.bool,
  };

  static defaultProps = {
    image: '',
    digitBgColor: Colors.background.tertiary,
    digitTxtColor: Colors.text.secondary,
    timeTxtColor: Colors.text.secondary,
    style: {},
    hideText: false,
    isGradient: false,
  };

  render() {
    const {
      image,
      digitBgColor,
      digitTxtColor,
      timeTxtColor,
      style,
      hideText,
      isGradient,
      start_date_time,
      end_date_time,
    } = this.props;

    const counterInfo = Utils.getCounterInfo(start_date_time, end_date_time);

    console.log('counterInfo', counterInfo);

    return (
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
          style,
        ]}>
        {image !== '' && (
          <RoundImage
            image={image}
            imageSize={50}
            imageBorderWidth={4}
            hideShadow
            containerStyle={{marginRight: Metrics.smallMargin}}
          />
        )}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
            minWidth: Metrics.ratio(105),
          }}>
          {!hideText && (
            <Text
              style={[
                ApplicationStyles.re12Primary,
                {marginBottom: Metrics.ratio(4), textAlign: 'right'},
              ]}>
              {counterInfo.status}
            </Text>
          )}
          {counterInfo.seconds > 0 && (
            <CountDown
              until={counterInfo.seconds}
              onFinish={this._updateCounter}
              digitBgColor={digitBgColor}
              digitTxtColor={digitTxtColor}
              timeTxtColor={timeTxtColor}
              isGradient={isGradient}
              timeToShow={['H', 'M', 'S']}
            />
          )}
          {counterInfo.seconds === 0 && (
            <Text style={[ApplicationStyles.b15Primary]}>
              {end_date_time
                ? Utils.timeFromNow(
                    Utils.getDateTimeFormatInLocalGmt(
                      end_date_time.split(' ')[0],
                      end_date_time.split(' ')[1],
                      DATE_TIME_FORMAT3,
                    ),
                  )
                : 'N/A'}
            </Text>
          )}
        </View>
      </View>
    );
  }
}
