import _ from 'lodash';
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  Animated,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ButtonView, SearchView, Loading} from '../../components';
import {
  RoundImage,
  CampaignListHorizontal,
  SeeAll,
  CampaignCarousel,
  EmptyView,
  CampaignList,
  CustomScrollAbleTabs,
} from '../../specifics';
import {ApplicationStyles, Metrics, Colors, Images, Strings} from '../../theme';
import Utils from '../../utils';
import styles from './styles';
import Header from './Header';
import {ITEM_LIMIT} from '../../constants';

//
import {connect} from 'react-redux';
import {
  HOME,
  NOTIFICATION_COUNT,
  CAMPAIGNS_LISTING_RUNNING_PARTICIPATED,
  CAMPAIGNS_LISTING_ENDED_PARTICIPATED,
  CAMPAIGNS_LISTING_INTERESTED,
  CAMPAIGNS_LISTING_UPCOMING_NEW,
} from '../../actions/ActionTypes';
import {generalAction} from '../../actions/GeneralAction';
import {API_HOME_DATA, API_NOTIFICATION_COUNT} from '../../config/WebService';
import MyProfile from '../MyProfile';

class Home extends React.Component {
  componentDidMount() {
    this._getNotificationCount();
  }

  _getNotificationCount = () => {
    const {user_id, generalAction} = this.props;

    generalAction(
      API_NOTIFICATION_COUNT,
      {
        reciever: user_id,
        get_count: 1,
      },
      NOTIFICATION_COUNT,
      '',
      undefined,
      undefined,
      false,
      true,
    );
  };

  _renderSearchContainer = () => {
    return (
      <View style={styles.searchContainer}>
        <SearchView onPress={this._onSearchPress} />
      </View>
    );
  };

  _onUserPress = () => {
    // Actions.myProfile();
    // Actions.push('myProfile');
    // Actions.drawerOpen();
    this.props.navigation.openDrawer();
    // Actions.DrawerOpen();
  };

  _onFilterPress = () => {
    // Actions.filter();
    this.props.navigation.navigate("filter")
  };

  _onSearchPress = () => {
    // Actions.searchedCampaigns();
    this.props.navigation.navigate("searchedCampaigns")
  };

  render() {
    const {
      campaignsRunningParticipated,
      campaignsEndedParticipated,
      campaignsInterested,
      campaignsUpComingNew,
    } = this.props;
    return (
      <View style={ApplicationStyles.scrollContainer}>
        <Header
          onUserPress={this._onUserPress}
          onFilterPress={this._onFilterPress}
          onNotificationPress={this._onNotificationPress}
        />
        {this._renderSearchContainer()}
        <CustomScrollAbleTabs isScrollable>
          <CampaignList
            tabLabel={Strings.tabs.active_campaigns}
            data={campaignsRunningParticipated}
            emptyTitle={Strings.emptyTitles.runningCampaignsParticipated}
            emptyDescription={
              Strings.emptyDescriptions.runningCampaignsParticipated
            }
            initialPayload={{
              type: 'newlyadded,running',
            }}
            requestType={CAMPAIGNS_LISTING_RUNNING_PARTICIPATED}
            hideLoading
          />
          <CampaignList
            tabLabel={Strings.tabs.ended_campaigns}
            data={campaignsEndedParticipated}
            emptyTitle={Strings.emptyTitles.endedCampaignsParticipated}
            emptyDescription={
              Strings.emptyDescriptions.endedCampaignsParticipated
            }
            initialPayload={{
              type: 'ended',
            }}
            requestType={CAMPAIGNS_LISTING_ENDED_PARTICIPATED}
            hideLoading
          />
          <CampaignList
            tabLabel={Strings.tabs.interested_in}
            data={campaignsInterested}
            emptyTitle={Strings.emptyTitles.interestedCampaigns}
            emptyDescription={Strings.emptyDescriptions.interestedCampaigns}
            initialPayload={{
              type: 'interested',
            }}
            requestType={CAMPAIGNS_LISTING_INTERESTED}
            hideLoading
          />
          <CampaignList
            tabLabel={Strings.tabs.coming_soon}
            data={campaignsUpComingNew}
            emptyTitle={Strings.emptyTitles.upcomingCampaignsNew}
            emptyDescription={Strings.emptyDescriptions.upcomingCampaignsNew}
            initialPayload={{
              type: 'newlyadded,upcoming',
            }}
            requestType={CAMPAIGNS_LISTING_UPCOMING_NEW}
            hideLoading
          />
        </CustomScrollAbleTabs>
      </View>
    );
  }
}

const mapStateToProps = ({
  user,
  campaignsRunningParticipated,
  campaignsEndedParticipated,
  campaignsInterested,
  campaignsUpComingNew,
}) => ({
  user_id: user.data.id,
  campaignsRunningParticipated,
  campaignsEndedParticipated,
  campaignsInterested,
  campaignsUpComingNew,
});

const actions = {generalAction};

export default connect(mapStateToProps, actions)(Home);
