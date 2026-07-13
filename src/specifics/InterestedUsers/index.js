import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import {RoundImage} from '../';
import {ApplicationStyles, Metrics, Colors} from '../../theme';
import Utils from '../../utils';
import {ITEM_LIMIT} from '../../constants';

const imageSize = 70;
const overlapSize = Metrics.ratio(40);
const styles = {
  container: {
    marginHorizontal: Metrics.baseMargin * 1.25,
    marginTop: Metrics.smallMargin * 1.5,
    marginBottom: Metrics.baseMargin * 1.25,
    height: Metrics.ratio(imageSize),
    width: Metrics.screenWidth,
  },
  itemStyle: {
    position: 'absolute',
  },
  lastItemStyle: {
    position: 'absolute',
    width: Metrics.ratio(imageSize),
    height: Metrics.ratio(imageSize),
    borderRadius: Metrics.ratio(imageSize) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default class InterestedUsers extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    count: PropTypes.number,
  };

  static defaultProps = {
    count: 0,
  };

  _renderInterestedUserItem = (item, index) => {
    const {user_id, avatar} = item;
    return (
      <RoundImage
        key={index}
        image={user_id ? user_id.avatar : avatar}
        containerStyle={[
          styles.itemStyle,
          {
            left: index === 0 ? 0 : index * overlapSize,
          },
        ]}
        imageSize={imageSize}
        imageBorderWidth={0}
        hideShadow
      />
    );
  };

  _renderInterestedFinalItem = (left, index) => {
    const {count} = this.props;
    return (
      <LinearGradient
        key={index}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={Colors.gradients.primaryBg}
        style={[
          styles.lastItemStyle,
          {
            left: left,
          },
        ]}>
        <Text style={ApplicationStyles.b20Primary}>+{count - ITEM_LIMIT}</Text>
      </LinearGradient>
    );
  };

  render() {
    const {data, count} = this.props;
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}>
        {/* data.map((item, index) =>
          index === data.length - 1 && count > 0
            ? this._renderInterestedFinalItem(index * overlapSize, index)
            : this._renderInterestedUserItem(item, index)
        ) */}
        {data.map((item, index) => this._renderInterestedUserItem(item, index))}
        {count > ITEM_LIMIT &&
          this._renderInterestedFinalItem(
            data.length * overlapSize,
            data.length,
          )}
      </ScrollView>
    );
  }
}
