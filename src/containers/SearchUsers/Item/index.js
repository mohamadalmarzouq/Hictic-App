import React from "react";
import { View, Text } from "react-native";
import { ButtonView } from "../../../components";
import { ApplicationStyles, Metrics } from "../../../theme";
import { RoundImage } from "../../../specifics";

export default class Item extends React.PureComponent {
  _onItemPress = () => {
    const { item, onPress } = this.props;
    onPress(item);
  };

  render() {
    const { avatar, full_name, email } = this.props.item;
    return (
      <ButtonView
        style={[
          ApplicationStyles.flexRow,
          {
            paddingHorizontal: Metrics.baseMargin * 1.5,
            paddingVertical: Metrics.baseMargin,
            alignItems: "center",
          },
        ]}
        onPress={this._onItemPress}
      >
        <RoundImage
          hideShadow
          image={avatar}
          imageSize={42}
          imageBorderWidth={0}
          isUser
        />
        <View
          style={[ApplicationStyles.flex, { marginLeft: Metrics.smallMargin }]}
        >
          <Text style={ApplicationStyles.sb17Secondary}>{full_name}</Text>
          {/* <Text style={ApplicationStyles.m14Quaternary}>{email}</Text> */}
        </View>
      </ButtonView>
    );
  }
}
