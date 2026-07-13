import React from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {TextInput} from '../../components';
import {LoginHeader, GradientButtonBorder} from '../../specifics';
import {Strings, ApplicationStyles} from '../../theme';

export default class NewPwd extends React.PureComponent {
  _onSubmitPress = () => {
    // Actions.changePassword();
    this.props.navigation.navigate("changePassword")
    //Actions.popTo("login");
  };

  render() {
    return (
      <View style={ApplicationStyles.container}>
        <LoginHeader title={Strings.new_pwd_title} />
        <TextInput label={Strings.new_pwd} />
        <TextInput label={Strings.confirm_pwd} />
        <GradientButtonBorder
          title={Strings.button_login}
          onPress={this._onSubmitPress}
        />
      </View>
    );
  }
}
