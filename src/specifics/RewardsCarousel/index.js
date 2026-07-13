import React from 'react';
import {View, Text, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Actions} from 'react-native-router-flux';
import {Colors, Metrics, Images, ApplicationStyles} from '../../theme';
import {ButtonView} from '../../components';
import utils from '../../utils';

export default class RewardsCarousel extends React.PureComponent {
  renderItem = ({item, index}) => {
    const {onPress} = this.props;

    return (
      <ButtonView
        style={{
          ...ApplicationStyles.shadow1,
          ...ApplicationStyles.flexRow,
          padding: Metrics.baseMargin * 1.25,
          borderRadius: Metrics.ratio(10),
          backgroundColor: Colors.background.primary,

          // for android
          margin: utils.isPlatformAndroid() ? 1 : 0,
          elevation: 2,
        }}
        disabled
        disabledOpacity={1}
        onPress={() => onPress(item)}>
        <Image source={Images.prizeIcons.discount_white_large} />
        <View style={{flex: 1, marginLeft: Metrics.smallMargin * 1.25}}>
          <Text
            style={[
              ApplicationStyles.b17Secondary,
              {marginBottom: Metrics.smallMargin / 2},
            ]}
            numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={ApplicationStyles.re15Secondary} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </ButtonView>
    );
  };

  render() {
    const {data} = this.props;
    return (
      <Carousel
        containerCustomStyle={{
          paddingTop: Metrics.baseMargin,
          paddingBottom: Metrics.baseMargin * 1.25,
        }}
        data={data}
        renderItem={this.renderItem}
        sliderWidth={Metrics.screenWidth}
        itemWidth={Metrics.screenWidth - Metrics.doubleBaseMargin * 1.25}
        inactiveSlideOpacity={1}
        inactiveSlideScale={0.94}
        firstItem={data.length > 2 ? 1 : 0}
      />
    );
  }
}
