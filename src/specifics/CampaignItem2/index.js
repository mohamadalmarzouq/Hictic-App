import React from 'react';
import {ImageBackground, View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ButtonView, ViewLayer, Image} from '../../components';
import {TimerComponent, IconText} from '../../specifics';
import {ApplicationStyles, Images, Metrics, Colors} from '../../theme';
import {
  REWARD_TYPE_CASH,
  REWARD_TYPE_COUPON,
  REWARD_TYPE_ITEM,
  CURRENCY,
} from '../../constants';
import Utils from '../../utils';
import { navNavigate } from '../../navigator';

const styles = {
  container: {
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowRadius: 12,
    shadowOpacity: 1,
    elevation: 5,
    borderRadius: Metrics.borderRadius * 2,
    width: Metrics.ratio(280) * 0.8,
    // Metrics.screenWidth -
    // (Metrics.screenWidth - Metrics.ratio(36)) / 2.1,
    height: Metrics.ratio(280),
    justifyContent: 'space-between',
    marginRight: Metrics.baseMargin,
    marginVertical: Metrics.baseMargin,
  },
  headerContainer: {
    height: Metrics.ratio(140),
    width: '100%',
    borderTopLeftRadius: Metrics.ratio(10),
    borderTopRightRadius: Metrics.ratio(10),
    overflow: 'hidden',
  },
  bottomContainer: {
    height: Metrics.ratio(140),
    padding: Metrics.baseMargin,
    justifyContent: 'space-between',
  },
};

export default class CampaignItem2 extends React.PureComponent {
  static defaultProps = {
    index: 0,
  };

  _onCampaignPress = () => {
    const {id} = this.props.item;
    // Actions.campaignDetail({campaign_id: id});
    // this.props.navigation.navigate("campaignDetail",{campaign_id: id})
     navNavigate("campaignDetail",{campaign_id: id})
  };

  render() {
    const {index, item} = this.props;
    let {
      title,
      image,
      start_date_time,
      end_date_time,
      reward_type,
      reward_price,
    } = item;

    const {icon, prize} = Utils.getRewardPrizeAndIcon(item);

    return (
      <ButtonView onPress={this._onCampaignPress}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: Colors.campaignColor[index],
              shadowColor: Colors.campaignShadowColor[index],
            },
          ]}>
          <View style={styles.headerContainer}>
            <Image
              style={ApplicationStyles.flex}
              source={{
                // uri: "https://lorempixel.com/400/217/"
                uri: Utils.getImagePath(image),
              }}
              isShowActivity={false}
            />
            <ViewLayer
              style={{
                backgroundColor: 'rgba(0,0,0,0.1)',
              }}
            />
          </View>

          <View style={styles.bottomContainer}>
            <IconText
              icon={icon}
              text={prize}
              textStyle={{color: Colors.text.primary}}
            />
            <Text style={[ApplicationStyles.b25Primary]} numberOfLines={1}>
              {title}
            </Text>
            <TimerComponent
              digitTxtColor={Colors.campaignColor[index]}
              timeTxtColor={Colors.campaignColor[index]}
              start_date_time={start_date_time}
              end_date_time={end_date_time}
            />
          </View>
        </View>
      </ButtonView>
    );
  }
}
