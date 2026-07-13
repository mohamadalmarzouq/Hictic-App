import React from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {RoundImage} from '../';
import {Metrics, Colors} from '../../theme';

const styles = {
  container: {
    paddingHorizontal: Metrics.baseMargin * 1.25,
    paddingTop: Metrics.smallMargin * 1.5,
    paddingBottom: Metrics.baseMargin * 1.25,
  },
  itemStyle: {
    marginRight: Metrics.ratio(12),
  },
};

export default class InterestedUsers extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  static defaultProps = {};

  _renderScorerItem = ({item, index}) => {
    const {user_id} = item;
    return (
      <RoundImage
        image={user_id.avatar}
        containerStyle={styles.itemStyle}
        imageSize={70}
        imageBorderWidth={user_id.avatar ? 0 : 1}
        hideShadow
        isUser
        resizeMode='cover'
      />
    );
  };

  render() {
    const {data} = this.props;
    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={data}
        renderItem={this._renderScorerItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}
