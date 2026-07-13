import React from 'react';
import {View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ButtonView} from '../../components';
import {REWARD_TYPE_COUPON} from '../../constants';
import {RoundImage} from '../../specifics';
import {ApplicationStyles, Metrics} from '../../theme';
import Utils from '../../utils';
import { navNavigate } from '../../navigator';

const styles = {
  itemStyle: {
    flexDirection: 'row',
    padding: Metrics.baseMargin * 1.25,
  },
  itemTextContainer: {
    flex: 1,
    marginLeft: Metrics.baseMargin,
  },
  itemText: {
    marginBottom: Metrics.smallMargin,
  },
};

export default class NotificationItem extends React.PureComponent {
  _onPress = () => {
    const {identifier, sender, target_id, target_table} = this.props.item;

    // we have updated structure and added key "identifier", but in case for old data, i am adding old format handling in default case
    switch (identifier) {
      case 'campaign_added':
        // Actions.campaignDetail({
        //   campaign_id: target_id?.id,
        // });
        // this.props.navigation.navigate("campaignDetail",{campaign_id: target_id?.id,})
        navNavigate("campaignDetail",{campaign_id: target_id?.id,})
        break;

      case 'campaign_won':
        // Actions.rewardDetail(
        //   target_id.reward_type === REWARD_TYPE_COUPON
        //     ? {coupon_id: target_id.coupon_details.id}
        //     : {reward: target_id},
        // );
//         this.props.navigation.navigate(
//   "rewardDetail",
//   target_id.reward_type === REWARD_TYPE_COUPON
//     ? { coupon_id: target_id.coupon_details.id }
//     : { reward: target_id }
// );
navNavigate(
  "rewardDetail",
  target_id.reward_type === REWARD_TYPE_COUPON
    ? { coupon_id: target_id.coupon_details.id }
    : { reward: target_id }
)
        break;

      case 'coupon_received':
        // Actions.rewardDetail({
        //   coupon_id: target_id.id,
        // });
//               this.props.navigation.navigate(
//   "rewardDetail",{coupon_id: target_id.id,}
// )
navNavigate(
  "rewardDetail",{coupon_id: target_id.id,}
)
        break;

      default: {
        if (target_table === 'campaigns') {
          // Actions.campaignDetail({
          //   campaign_id:
          //     typeof target_id === 'object' ? target_id.id : target_id,
          // });
          // this.props.navigation.navigate("campaignDetail",{
          //   campaign_id:
          //     typeof target_id === 'object' ? target_id.id : target_id,
          // })
          navNavigate("campaignDetail",{
            campaign_id:
              typeof target_id === 'object' ? target_id.id : target_id,
          })
        } else if (target_table === 'campaign_coupons') {
          // Actions.rewardDetail({
          //   coupon_id: typeof target_id === 'object' ? target_id.id : target_id,
          // });
//                      this.props.navigation.navigate(
//   "rewardDetail",{
//             coupon_id: typeof target_id === 'object' ? target_id.id : target_id,
//           }
// );
navNavigate(
  "rewardDetail",{
            coupon_id: typeof target_id === 'object' ? target_id.id : target_id,
          }
)
        }
      }
    }

    // keys given by backend
    // old
    // if (target_table === 'campaigns') {
    //   Actions.campaignDetail({
    //     campaign_id: typeof target_id === 'object' ? target_id.id : target_id,
    //   });
    // } else if (target_table === 'campaign_coupons') {
    //   Actions.rewardDetail({
    //     coupon_id: typeof target_id === 'object' ? target_id.id : target_id,
    //   });
    // }
  };

  render() {
    const {body, sender, target_id, created_at} = this.props.item;

    let localGMTDate;
    if (created_at) {
      const dateTimeArray = created_at.split(' ');
      localGMTDate = Utils.getLocalGMTDateTime(
        dateTimeArray[0],
        dateTimeArray[1],
      );
    }

    return (
      <ButtonView style={styles.itemStyle} onPress={this._onPress}>
        <RoundImage
          imageSize={60}
          imageBorderWidth={5}
          image={
            target_id && target_id.brand
              ? Utils.getImagePath(target_id.brand.photo)
              : sender.avatar
          }
        />
        <View style={styles.itemTextContainer}>
          <Text style={[ApplicationStyles.m17Secondary, styles.itemText]}>
            {body}
          </Text>
          <Text style={ApplicationStyles.re13Secondary}>
            {localGMTDate ? Utils.timeFromNow(localGMTDate) : 'N/A'}
          </Text>
        </View>
      </ButtonView>
    );
  }
}
