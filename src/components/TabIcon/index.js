import React from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-native';
import {Images, Colors, Strings} from '../../theme';
import NotificationCount from './NotificationCount';

export default class TabIcon extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    focused: PropTypes.bool.isRequired,
  };

  render() {
    const {title, focused} = this.props;

    if (title === Strings.navbar_title.notifications) {
      return <NotificationCount title={title} focused={focused} />;
    } else {
      return (
        <Image
          resizeMode="contain"
          style={!focused ? {tintColor: '#FFE080'} : {tintColor: Colors.white}}
          source={Images.tabs[title.replace(' ', '').toLowerCase()]}
        />
      );
    }
  }
}
