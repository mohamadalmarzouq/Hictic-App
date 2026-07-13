import React from 'react';
import {View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {SearchView} from '../../components';
import {CampaignList} from '../../specifics';
import {Metrics, Colors, ApplicationStyles, Strings} from '../../theme';
import {API_CAMPAIGN_LISTING} from '../../config/WebService';
import {
  CAMPAIGNS_LISTING_SEARCHED,
  CLEAR_SEARCHED_CAMPAIGNS,
} from '../../actions/ActionTypes';

import {generalListingSearchRequest} from '../../actions/GeneralListingActions';
import {generalDispatchType} from '../../actions/GeneralAction';

const styles = {
  searchContainer: {
    backgroundColor: Colors.background.quaternary,
    paddingBottom: Metrics.baseMargin,
  },
};

class SearchedCampaigns extends React.PureComponent {
  componentWillUnmount() {
    this.props.generalDispatchType(CLEAR_SEARCHED_CAMPAIGNS);
  }

  state = {
    searchValue: '',
  };

  _fetchData = (
    isPullToRefresh = false,
    page = 1,
    searchValue = this.state.searchValue,
    isSearch = false,
  ) => {
    const {generalListingSearchRequest, user_id} = this.props;

    generalListingSearchRequest(
      API_CAMPAIGN_LISTING,
      {
        user_id: user_id,
        isPullToRefresh: isPullToRefresh,
        keyword: searchValue,
        isSearch: isSearch,
        page,
      },
      CAMPAIGNS_LISTING_SEARCHED,
    );
  };

  _onSearchTextChanged = value => {
    this.setState({searchValue: value});
    this._fetchData(false, 1, value, true);
  };

  _renderSearchContainer = () => {
    const {isSearch} = this.props.campaignsSearched;
    return (
      <View style={styles.searchContainer}>
        <SearchView
          onChangeText={this._onSearchTextChanged}
          isSearch={isSearch}
        />
      </View>
    );
  };

  render() {
    const {campaignsSearched} = this.props;
    return (
      <View style={ApplicationStyles.scrollContainer}>
        {this._renderSearchContainer()}
        <CampaignList
          data={campaignsSearched}
          emptyTitle={Strings.emptyTitles.searchedCampaigns}
          emptyDescription={Strings.emptyDescriptions.searchedCampaigns}
          request={this._fetchData}
          modalLoading
        />
      </View>
    );
  }
}

const mapStateToProps = ({user, campaignsSearched}) => ({
  user_id: user.data.id,
  campaignsSearched,
});

const actions = {generalDispatchType, generalListingSearchRequest};

export default connect(mapStateToProps, actions)(SearchedCampaigns);
