import React from 'react';
import {ImageBackground, View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ButtonView, ViewLayer, Image} from '../../components';
import {TimerComponent, IconText} from '../../specifics';
import {ApplicationStyles, Colors, Images, Metrics} from '../../theme';
import {
  REWARD_TYPE_CASH,
  REWARD_TYPE_COUPON,
  REWARD_TYPE_ITEM,
} from '../../constants';
import Utils from '../../utils';
import { navNavigate } from '../../navigator';

const styles = {
  container: {
    overflow: 'hidden',
    borderRadius: Metrics.borderRadius * 2,
    width: Metrics.screenWidth - Metrics.doubleBaseMargin * 1.25,
    height: Metrics.ratio(217),
    marginBottom: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.mediumMargin,
    justifyContent: 'space-between',
  },
  topContainer: {
    marginBottom: Metrics.smallMargin / 2,
  },
  currencyContainer: {
    width: Metrics.ratio(18),
    height: Metrics.ratio(18),
    borderRadius: Metrics.ratio(18) / 2,
    backgroundColor: Colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Metrics.ratio(6),
    paddingTop: Metrics.ratio(1),
  },
};

export default class CampaignItem1 extends React.PureComponent {
  _onCampaignPress = () => {
    const {id} = this.props.item;
       
    // Actions.campaignDetail({campaign_id: id});
    //  this.props.navigation.navigate("campaignDetail",{campaign_id: id})
     navNavigate("campaignDetail",{campaign_id: id})
  };

  render() {
    const {item, style} = this.props;
    let {
      title,
      image,
      start_date_time,
      end_date_time,
      reward_type,
      reward_price,
      brand,
    } = item;

    const {icon, prize} = Utils.getRewardPrizeAndIcon(item, 'black');

    return (
      <ButtonView onPress={this._onCampaignPress}>
        <View
          //source={{ uri: "https://lorempixel.com/400/217/" }}
          // source={{ uri: Utils.getImagePath(item.image) }}
          style={[styles.container, style]}>
          <Image
            source={{uri: Utils.getImagePath(image)}}
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              top: 0,
              left: 0,
            }}
          />
          <ViewLayer />
          <View>
            <IconText
              icon={icon}
              text={prize}
              style={styles.topContainer}
              textStyle={ApplicationStyles.m13Primary}
            />
            <Text
              style={[
                ApplicationStyles.b25Primary,
                {
                  width:
                    (Metrics.screenWidth - Metrics.doubleBaseMargin * 1.25) / 2,
                },
              ]}
              numberOfLines={3}>
              {title}
            </Text>
          </View>

          <TimerComponent
            image={Utils.getImagePath(brand.photo)}
            start_date_time={start_date_time}
            end_date_time={end_date_time}
          />
        </View>
      </ButtonView>
    );
  }
}
