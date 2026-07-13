import React from 'react';
import {View, Image, Text} from 'react-native';
import {Button} from '../../components';
import {Images, ApplicationStyles, Strings, Metrics} from '../../theme';
import {GradientButtonBorder} from '../../specifics';
import Utils from '../../utils';

export default class Invite extends React.Component {
  _onInvitePress = () => {
    Utils.shareApp(`Dear User, \nLets install the app and win rewards.`); // update the url when discussed/provided by subhan(backend) for deep link with content.
  };

  render() {
    return (
      <View
        style={[
          ApplicationStyles.container,
          {
            paddingTop: Metrics.doubleBaseMargin,
            paddingBottom: Metrics.baseMargin,
          },
        ]}>
        <View>
          <Image source={Images.logo} style={{alignSelf: 'center'}} />
          <Text
            style={[
              ApplicationStyles.re20Secondary,
              {
                marginHorizontal: Metrics.mediumMargin * 2,
                textAlign: 'center',
                marginTop: Metrics.smallMargin * 1.5,
              },
            ]}>
            Invite Friends to HicTic and both of you can share rewards with each
            other
          </Text>
        </View>
        <Image
          source={Images.invite_image}
          style={{
            alignSelf: 'center',
            flex: 1,
            marginVertical: Metrics.smallMargin,
          }}
          resizeMode="contain"
        />
        <GradientButtonBorder
          title={Strings.button_invite}
          onPress={this._onInvitePress}
        />
      </View>
    );
  }
}
