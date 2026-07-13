// @flow
import {Platform, Alert, StatusBar, findNodeHandle, Share} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {MessageBarManager} from 'react-native-message-bar';
import moment from 'moment';
const phoneUtil =
  require('google-libphonenumber').PhoneNumberUtil.getInstance();
import {getAllCountries} from 'react-native-country-picker-modal';
import {
  PASSWORD_MIN_LIMIT,
  PASSWORD_MAX_LIMIT,
  PHONE_NUM_LIMIT,
  CAMPAIGN_STARTS_IN,
  CAMPAIGN_ENDS_IN,
  CAMPAIGN_ENDED,
  REWARD_TYPE_CASH,
  REWARD_TYPE_COUPON,
} from '../constants';
import {Colors, Images, Strings} from '../theme';
import {API_NOTIFICATION_COUNT_RESET, BASE_URL} from '../config/WebService';
import numeral from 'numeral';
import DataHandler from '../services/DataHandler';
import {generalAction} from '../actions/GeneralAction';
import {NOTIFICATION_COUNT} from '../actions/ActionTypes';
import { navNavigate } from '../navigator';

class Util {
  keyExtractor = (item: Object, index: number) => index;
  getPlatform = () => Platform.OS;
  isPlatformAndroid() {
    return Platform.OS === 'android';
  }
  isPlatformIOS() {
    return Platform.OS === 'ios';
  }
  isValidURL(url: 'string') {
    const re =
      /^(http|https|fttp):\/\/|[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;
    return re.test(url);
  }
  isEmailValid(email: string) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  isPasswordValid(password: string) {
    return password.length > 5;
  }

  isObjectEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  getValidImage(image: any) {
    if (typeof image === 'string' && this.isValidURL(image)) {
      return {uri: image};
    }
    // if (typeof image === "string" && !this.isValidURL(image)) {
    //   return require(image);
    // }
    return image;
  }

  getDeviceType() {
    return Platform.OS === 'android' ? 'android' : 'ios';
  }

  showCommonMessage(title, message) {
    Alert.alert(
      title,
      message,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {
        cancelable: false,
      },
    );
  }

  showMessage(message, alertType = 'error') {
    MessageBarManager.showAlert({
      message,
      alertType,
    });
  }

  showAlertWithDelay(title, message, delay = 500) {
    setTimeout(() => {
      this.showCommonMessage(title, message);
    }, delay);
  }

  setStatusBar(style = 'light') {
    if (!this.isPlatformAndroid()) {
      if (style === 'light') {
        StatusBar.setBarStyle('dark-content');
      } else {
        StatusBar.setBarStyle('light-content');
      }
    }
  }

  getSeconds(minutes = 0, seconds = 0) {
    return minutes * 60 + seconds;
  }

  getMinutesAndSeconds(timeInSeconds = 0) {
    return {
      minutes: Math.floor(timeInSeconds / 60),
      seconds: Math.floor(timeInSeconds % 60),
    };
  }

  getTimeDifferenceColor(timeLimit, timeTaken) {
    const timeLimitSeconds = timeLimit.minutes * 60 + timeLimit.seconds;
    const timeTakenSeconds = timeTaken.minutes * 60 + timeTaken.seconds;

    const difference = timeLimitSeconds / 3;

    // optimized
    if (timeTakenSeconds <= difference) {
      return Colors.progressbarGreen;
    }
    // average
    else if (timeTakenSeconds <= difference * 2) {
      return Colors.progressbarYellow;
    }
    // over
    else {
      return Colors.progressbarRed;
    }
  }

  getTimeDifferenceProgress(timeLimit, timeTaken) {
    const timeLimitSeconds = timeLimit.minutes * 60 + timeLimit.seconds;
    const timeTakenSeconds = timeTaken.minutes * 60 + timeTaken.seconds;

    return timeTakenSeconds / timeLimitSeconds;
  }

  getFormattedDateTime(dateTime, Format) {
    return moment(dateTime).format(Format);
  }

  getCurrentFormattedDateTime(Format) {
    return moment(new Date()).format(Format);
  }

  playSound() {
    Sound.setCategory('Playback');

    var whoosh = new Sound(Raw.testSound, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    });

    // Play the sound with an onEnd callback

    setTimeout(() => {
      whoosh.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
          // reset the player to its uninitialized state (android only)
          // this is the only option to recover after an error occured and use the player again
          whoosh.reset();
        }
      });
    }, 1000);

    // Release the audio player resource
    whoosh.release();
  }

  userGMT() {
    return moment().format(GMT_TIME_FORMAT);
  }

  timeDifferenceSec(time1, time2) {
    return moment.duration(moment(time1).diff(time2)).as('seconds');
  }

  getPointsDifference(points = 0, maxPoints = 100, factor = 3) {
    const difference = maxPoints / factor;

    // optimized
    if (points <= difference) {
      return Colors.progressbarGreen;
    }
    // average
    else if (points <= difference * 2) {
      return Colors.progressbarYellow;
    }
    // over
    else {
      return Colors.progressbarRed;
    }
  }

  validate(value, type, emptyMsg) {
    switch (type) {
      case 'email':
        if (!value || value.length === 0) {
          return 'Please enter email';
        } else if (!this.isEmailValid(value)) {
          return 'Please enter valid email';
        } else {
          return '';
        }

        break;

      case 'empty':
        if (!value || value.length === 0) {
          return emptyMsg || 'Please enter field';
        } else {
          return '';
        }

        break;

      case 'password':
        if (!value || value.length === 0) {
          return emptyMsg || 'Please enter password';
        } else if (
          value.length < PASSWORD_MIN_LIMIT ||
          value.length > PASSWORD_MAX_LIMIT
        ) {
          return 'Please insert valid password';
        } else {
          return '';
        }

        break;

      case 'phone':
        if (!value || value.length === 0) {
          return emptyMsg || 'Please enter phone number';
        } else if (value.length < PHONE_NUM_LIMIT) {
          return 'Please insert valid phone number';
        } else {
          return '';
        }

        break;
    }
  }

  validateFields = fieldsarray => {
    let isValid = true;
    let alreadySetFocus = false;
    for (let i = 0; i < fieldsarray.length; i += 1) {
      const setFocusOnInput = i === 0 || !alreadySetFocus;
      if (!fieldsarray[i].checkValidation(true, setFocusOnInput)) {
        isValid = false;
        alreadySetFocus = true;
      }
    }
    return isValid;
  };

  validatePassword = password => {
    if (password && password.length >= 8 && password.length <= 32) {
      return true;
    }
    return false;
  };
  validatePhone = phone => {
    // const re = /^[0-9]{10}$/;
    const re = /^[0-9]+$/;
    return re.test(phone);
  };
  validateEmail = email => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  validateNumeric = number => {
    const numberInput = Number(number);
    return numberInput > 0 && number.indexOf('.') === -1;
  };
  validateDecimal = number => {
    const numberInput = Number(number);
    return (
      numberInput > 0 &&
      !Number.isNaN(number) &&
      number.substr(number.length - 1) !== '.'
    );
  };

  scrollToPosition = (scrollView, input) => {
    if (this.isPlatformAndroid()) {
      const scrollResponder = scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(input),
        120,
        true,
      );
    }
  };

  // number with country code
  isValidNumber(countryCode = 'US', number) {
    return phoneUtil.isValidNumber(
      phoneUtil.parseAndKeepRawInput(number, countryCode),
    );
  }

  isValidNumber(countryCode = 'US', number) {
    return phoneUtil.isValidNumber(
      phoneUtil.parseAndKeepRawInput(number, countryCode),
    );
  }

  getCountryCode(dialCode) {
    const userCountryData = getAllCountries().then(
      country => country.callingCode === dialCode,
    );

    return userCountryData[0] && userCountryData[0].cca2
      ? userCountryData[0].cca2
      : '';
  }

  getQueryStrings(params = {}) {
    return Object.keys(params)
      .map(key => key + '=' + params[key])
      .join('&');
  }

  getImagePath(postPath = '') {
    console.log(BASE_URL + '/' + postPath);
    return BASE_URL + '/' + postPath;
  }

  // given time and date are as follows
  // date-> 2000-12-30
  // time-> 12:12:00 (24 hours format)
  // gmt-> 0
  getDateTimeFormatInLocalGmt(
    date = '2000-01-30',
    time = '00:00:00',
    Format = 'yyyy-dd-mm hh:mm:ss a',
    addDays = 0,
  ) {
    const tempDate = this.getLocalGMTDateTime(date, time, addDays);

    // return date in required format
    return moment(tempDate).format(Format);
  }

  // given time and date are as follows
  // date-> 2000-12-30
  // time-> 12:12:00 (24 hours format)
  // gmt-> 0
  getLocalGMTDateTime(date = '2000-01-30', time = '00:00:00', addDays = 0) {
    const tempDate = new Date();

    // get gmt offset
    const timeOffsetInMinutes = tempDate.getTimezoneOffset();

    // split date and time
    const dateArray = date.split('-');
    const timeArray = time.split(':');

    // set date
    if (dateArray[0]) tempDate.setFullYear(dateArray[0]);
    if (dateArray[1]) tempDate.setMonth(dateArray[1] - 1);
    if (dateArray[2]) tempDate.setDate(dateArray[2]);

    // set time
    if (timeArray[0]) tempDate.setHours(timeArray[0]);
    if (timeArray[1]) tempDate.setMinutes(timeArray[1]);
    if (timeArray[2]) tempDate.setSeconds(timeArray[2]);

    if (addDays) {
      // tempDate.set
      tempDate.setDate(tempDate.getDate() + addDays);
    }

    // add/subtract offset difference in minutes
    tempDate.setMinutes(
      timeOffsetInMinutes >= 0
        ? tempDate.getMinutes() - Math.abs(timeOffsetInMinutes)
        : tempDate.getMinutes() + Math.abs(timeOffsetInMinutes),
    );

    return tempDate;
  }

  getTimeDifferenceCurrent(dateTimeInUTC0 = '2018-12-28T16:15:00+00:00') {
    var a = moment(dateTimeInUTC0);

    var b = moment(new Date().toUTCString());

    return a.diff(b, 'seconds');
  }

  getCounterInfo(startDateTime, endDateTime) {
    let counterData = {
      seconds: 0,
      status: CAMPAIGN_ENDED,
    };

    if (startDateTime && endDateTime) {
      const startDate = startDateTime.split(' ')[0];
      const startTime = startDateTime.split(' ')[1];
      const endDate = endDateTime.split(' ')[0];
      const endTime = endDateTime.split(' ')[1];

      const startDateTimeUTC = `${startDate}T${startTime}+00:00`;
      const endDateTimeUTC = `${endDate}T${endTime}+00:00`;

      const startDateTimeDiff = this.getTimeDifferenceCurrent(startDateTimeUTC);
      const endDateTimeDiff = this.getTimeDifferenceCurrent(endDateTimeUTC);

      if (startDateTimeDiff > 0) {
        counterData.seconds = startDateTimeDiff;
        counterData.status = CAMPAIGN_STARTS_IN;
      } else if (endDateTimeDiff > 0) {
        counterData.seconds = endDateTimeDiff;
        counterData.status = CAMPAIGN_ENDS_IN;
      }
    }

    return counterData;
  }

  getNextPageUrl(url) {
    return url.split('/public')[1];
  }

  timeFromNow(time) {
    moment.updateLocale('en', {
      relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s: 'a few seconds',
        ss: '%d seconds',
        m: 'a minute',
        mm: '%d minutes',
        h: 'an hour',
        hh: '%d hours',
        d: 'a day',
        dd: '%d days',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years',
      },
    });

    return moment(time).fromNow();
  }

  shareCampaign(content, campaign_id) {
    const URL = `${BASE_URL}/share_campaign/${campaign_id}`;
    const message = Platform.select({
      ios: content,
      android: `${content}\n${URL}`,
    });
    this.onShare('', message, URL);
  }

  shareApp(content = 'lets install the app and win rewards.') {
    const URL = `${BASE_URL}/share_app`;
    const message = Platform.select({
      ios: content,
      android: `${content}\n${URL}`,
    });
    this.onShare('Title', message, URL);
  }

  onShare(title, message, url) {
    Share.share({
      title,
      message,
      url,
    });
  }

  handleDeepLinkClick(route, id) {
    setTimeout(() => {
      switch (route) {
        case 'campaign':
          // Actions.campaignDetail({campaign_id: id});
          navNavigate("campaignDetail",{campaign_id: id})
         
          break;

        case 'share_app':
          break;
      }
    }, 1000);
  }

  formatNumber2K(value) {
    return numeral(value).format('0a');
  }

  formatNumberComma(value) {
    return numeral(value).format('0,0');
  }

  // iconColor -> "yellow", "black", or "white"
  getRewardPrizeAndIcon(
    {reward_type, reward_price, coupon_detail},
    iconColor = 'yellow',
    isReward,
  ) {
    const rewardPrize = {
      icon: Images.prizeIcons[`discount_${iconColor}`],
      prize: reward_price,
    };

    // Rewarded
    if (reward_type === REWARD_TYPE_CASH) {
      rewardPrize.prize =
        this.formatNumberComma(reward_price) +
        ' KD ' +
        (isReward ? Strings.rewarded : '');
      rewardPrize.icon = Images.prizeIcons[`dollar_${iconColor}`];
    } else if (reward_type === REWARD_TYPE_COUPON) {
      rewardPrize.prize = isReward
        ? coupon_detail.title
        : Strings.contain_rewards;
    }

    return rewardPrize;
  }

  resetNotificationCount() {
    const {user} = DataHandler.getStore().getState();
    console.log('hihihi', user);

    if (user.data && user.data.id) {
      DataHandler.getStore().dispatch(
        generalAction(
          API_NOTIFICATION_COUNT_RESET,
          {
            reciever: user.data.id,
            reset_count: 1,
          },
          NOTIFICATION_COUNT,
          '',
          undefined,
          undefined,
          false,
          true,
          false,
        ),
      );
    }
  }
}

export default new Util();
