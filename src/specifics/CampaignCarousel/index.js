import React from 'react';
import {View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Colors, Metrics} from '../../theme';
import {CampaignItem1} from '../';

export default class CampaignCarousel extends React.PureComponent {
  render() {
    const {data} = this.props;
    return (
      <View
        style={{
          height: Metrics.ratio(217) + Metrics.smallMargin * 2,
        }}>
        <View
          style={{flex: 1, backgroundColor: Colors.background.quaternary}}
        />
        <View style={{flex: 1, backgroundColor: Colors.background.primary}} />

        <Carousel
          containerCustomStyle={{
            position: 'absolute',
            paddingVertical: Metrics.smallMargin,
          }}
          data={data}
          renderItem={({item, index}) => (
            <CampaignItem1
              style={{
                marginBottom: 0,
              }}
              item={item}
            />
          )}
          sliderWidth={Metrics.screenWidth}
          itemWidth={Metrics.screenWidth - Metrics.doubleBaseMargin * 1.25}
          inactiveSlideOpacity={1}
          inactiveSlideScale={0.95}
          firstItem={data.length > 2 ? 1 : 0}
        />
      </View>
    );
  }
}
