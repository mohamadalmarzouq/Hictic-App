import React from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";
import { RoundImage, IconText } from "../../../specifics";
import {
  ApplicationStyles,
  Images,
  Colors,
  Metrics,
  Strings
} from "../../../theme";
import {
  REWARD_TYPE_CASH,
  REWARD_TYPE_COUPON,
  TIME,
  DATE_FORMAT_COMA
} from "../../../constants";
import Utils from "../../../utils";
import { BackButton, ButtonView } from "../../../components";
import { Actions } from "react-native-router-flux";

const styles = {
  container: {
    ...ApplicationStyles.shadow1,
    //  height: Metrics.ratio(210),
    borderRadius: Metrics.ratio(10),
    backgroundColor: Colors.background.primary,
    marginHorizontal: Metrics.baseMargin * 1.25,
    marginTop: Metrics.baseMargin,
    padding: Metrics.baseMargin,
    justifyContent: "space-between"
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerText: { marginLeft: Metrics.smallMargin },
  descriptionContainer: {
    padding: Metrics.smallMargin * 1.5,
    backgroundColor: Colors.background.tertiary,
    borderRadius: Metrics.borderRadius,
    marginVertical: Metrics.baseMargin
  }
};

export default class RewardItem extends React.PureComponent {
  static propsTypes = {
    item: PropTypes.object.isRequired,
    isLoginUser: PropTypes.bool
  };
  static defaultProps = {
    isLoginUser: false
  };

  _onItemPress = () => {
    const { reward_type, coupon_detail } = this.props.item;

    // Actions.rewardDetail(
    //   reward_type === REWARD_TYPE_COUPON && coupon_detail
    //     ? { coupon_id: coupon_detail.id }
    //     : { reward: this.props.item }
    // );
    this.props.navigation.navigate(
  "rewardDetail",
  reward_type === REWARD_TYPE_COUPON && coupon_detail
    ? { coupon_id: coupon_detail.id }
    : { reward: this.props.item }
);
  };

  _onSharePress = () => {
    const { id } = this.props.item.coupon_detail;
    // Actions.searchUsers({ coupon_id: id });
    this.props.navigation.navigate("searchUsers",{ coupon_id: id })
  };

  _renderHeader = () => {
    const { isLoginUser } = this.props;
    const { brand, title, reward_type, coupon_detail, user } = this.props.item;
    return (
      <View style={styles.headerContainer}>
        <RoundImage
          image={Utils.getImagePath(brand ? brand.photo : "")}
          imageSize={36}
          imageBorderWidth={3}
        />
        <Text
          style={[
            ApplicationStyles.sb14Secondary,
            ApplicationStyles.flex,
            styles.headerText
          ]}
        >
          {title}
        </Text>

        {reward_type === REWARD_TYPE_COUPON && isLoginUser && coupon_detail && (
          <BackButton
            image={Images.share}
            onPress={this._onSharePress}
            style={{
              paddingVertical: Metrics.smallMargin / 2,
              paddingRight: 0,
              paddingLeft: Metrics.smallMargin
            }}
          />
        )}
      </View>
    );
  };

  _renderRewardDescription = () => {
    let { reward_type, description, coupon_detail } = this.props.item;

    const { icon, prize } = Utils.getRewardPrizeAndIcon(
      this.props.item,
      "black",
      true
    );

    return (
      <View style={styles.descriptionContainer}>
        <IconText
          icon={icon}
          text={prize}
          textStyle={ApplicationStyles.b17Secondary}
        />
        {reward_type === REWARD_TYPE_COUPON &&
          coupon_detail &&
          this._renderExpiry()}

        {/* <Text
          style={[ApplicationStyles.b17Secondary, styles.descriptionText]}
          numberOfLines={1}
        >
          {`${price} Rewarded`}
        </Text> */}
        {/* <Text style={ApplicationStyles.re16Secondary} numberOfLines={2}>
          {description}
      </Text> */}
      </View>
    );
  };

  _renderExpiry = () => {
    const { end_date_time, coupon_detail } = this.props.item;

    return (
      <View
        style={[
          ApplicationStyles.flexRow,
          { marginTop: Metrics.smallMargin / 2 }
        ]}
      >
        <Text style={ApplicationStyles.re14Secondary}>{`${
          Strings.expiry
        }: `}</Text>
        <Text style={ApplicationStyles.b14Secondary}>
          {Utils.getDateTimeFormatInLocalGmt(
            end_date_time.split(" ")[0],
            end_date_time.split(" ")[1],
            DATE_FORMAT_COMA,
            coupon_detail.validity_for_days
          )}
        </Text>
      </View>
    );
  };

  _renderFooter = () => {
    const { end_date_time } = this.props.item;

    const localGmtTime = Utils.getLocalGMTDateTime(
      end_date_time.split(" ")[0],
      end_date_time.split(" ")[1]
    );

    return (
      <View style={styles.headerContainer}>
        <IconText
          icon={Images.clock}
          text={Utils.getFormattedDateTime(localGmtTime, TIME)}
          style={{ marginRight: Metrics.smallMargin * 1.5 }}
        />
        <IconText
          icon={Images.calendar}
          text={Utils.getFormattedDateTime(localGmtTime, DATE_FORMAT_COMA)}
        />
      </View>
    );
  };

  render() {
    return (
      <ButtonView style={styles.container} onPress={this._onItemPress}>
        {this._renderHeader()}
        {this._renderRewardDescription()}
        {this._renderFooter()}
      </ButtonView>
    );
  }
}
