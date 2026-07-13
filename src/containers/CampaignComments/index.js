import React from 'react';
import {View, TextInput, Image, ScrollView} from 'react-native';
import {Images} from '../../theme';

export default class CampaignComments extends React.Component {
  renderFooter = () => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          maxHeight: 100,
          flexDirection: 'row',
        }}>
        <TextInput style={{flex: 1}} placeholder="Comment" multiline />
        <Image source={Images.calendar} style={{alignSelf: 'center'}} />
      </View>
    );
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'green',
          justifyContent: 'flex-end',
        }}>
        {this.renderFooter()}
      </View>
    );
  }
}
