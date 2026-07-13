import React from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {CampaignItem1, CampaignItem2} from '../../specifics';
import {ApplicationStyles, Metrics, Images} from '../../theme';

export default class CampaignListHorizontal extends React.PureComponent {
  static propTypes = {
    // for vertical list
    data: PropTypes.array,
  };

  static defaultProps = {
    data: [],
  };

  _renderItem = ({item, index}) => <CampaignItem2 index={index} item={item} />;

  render() {
    const {data} = this.props;
    return (
      <FlatList
        style={[ApplicationStyles.container]}
        contentContainerStyle={{paddingRight: Metrics.baseMargin * 1.25}}
        data={data}
        renderItem={this._renderItem}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
    );
  }
}
