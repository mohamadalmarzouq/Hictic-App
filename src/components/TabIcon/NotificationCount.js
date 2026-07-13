import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import {Text} from '../../components';
import {Images, Metrics, Colors} from '../../theme';

class NotificationCount extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    focused: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
  };

  _renderCount = () => {
    const {notification_count} = this.props.user;

    return notification_count > 0 ? (
      <View
        style={{
          position: 'absolute',
          top: -8,
          right: -2,
          minWidth: 16,
          height: 16,
          paddingHorizontal: 4,
          justifyContent: 'center',
          backgroundColor: Colors.background.denary,
          borderRadius: 8,
        }}>
        <Text
          size="xxxxxSmall"
          type="medium"
          color="primary"
          textAlign="center">
          {notification_count}
        </Text>
      </View>
    ) : null;
  };

  render() {
    const {title, focused, user} = this.props;
    return (
      <View>
        <Image
          resizeMode="contain"
          style={!focused ? {tintColor: '#FFE080'} : {}}
          source={Images.tabs[title.toLowerCase()]}
        />
        {this._renderCount()}
      </View>
    );
  }
}

const mapStateToProps = ({user}) => ({
  user,
});

const actions = {};

export default connect(mapStateToProps, actions)(NotificationCount);
