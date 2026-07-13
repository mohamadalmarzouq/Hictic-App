import _ from "lodash";
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  Animated
} from "react-native";
import { Actions } from "react-native-router-flux";
import { ButtonView, SearchView, Loading } from "../../components";
import {
  RoundImage,
  CampaignListHorizontal,
  SeeAll,
  CampaignCarousel,
  EmptyView
} from "../../specifics";
import {
  ApplicationStyles,
  Metrics,
  Colors,
  Images,
  Strings
} from "../../theme";
import Utils from "../../utils";
import styles from "./styles";
import Header from "./Header";
import { ITEM_LIMIT } from "../../constants";

//
import { connect } from "react-redux";
import { HOME, NOTIFICATION_COUNT } from "../../actions/ActionTypes";
import { generalListingRequest } from "../../actions/GeneralListingActions";
import { generalAction } from "../../actions/GeneralAction";
import { API_HOME_DATA, API_NOTIFICATION_COUNT } from "../../config/WebService";

class Home extends React.Component {
  componentDidMount() {
    const {
      featuredCampaignsArray,
      upComingCampaignsArray,
      missedCampaignsArray,
      participatedCampaignsArray
    } = this.props.home.data;

    const hasData =
      (featuredCampaignsArray && featuredCampaignsArray.length > 0) ||
      (upComingCampaignsArray && upComingCampaignsArray.length > 0) ||
      (missedCampaignsArray && missedCampaignsArray.length > 0) ||
      (participatedCampaignsArray && participatedCampaignsArray.length > 0);

    this._fetchData(hasData);
    this._getNotificationCount();
  }

  _fetchData = (isPullToRefresh = false) => {
    const { generalListingRequest, cbShowLoader, user_id } = this.props;

    generalListingRequest(
      API_HOME_DATA,
      {
        user_id,
        isPullToRefresh: isPullToRefresh
      },
      HOME
    );
  };

  _getNotificationCount = () => {
    const { user_id, generalAction } = this.props;

    generalAction(
      API_NOTIFICATION_COUNT,
      {
        reciever: user_id,
        get_count: user_id
      },
      NOTIFICATION_COUNT,
      "",
      undefined,
      undefined,
      false,
      true
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
    Actions.myProfile();
  };

  _onFilterPress = () => {
    Actions.filter();
  };

  _onNotificationPress = () => {
    Actions.notifications();
  };

  _onSearchPress = () => {
    Actions.searchedCampaigns();
  };

  _onPullToRefresh = () => {
    this._fetchData(true);
  };

  _onNewlyPress = () => {
    Actions.newlyAdded();
  };

  _onMissedPress = () => {
    Actions.missedCampaigns();
  };

  _onParticipatedPress = () => {
    Actions.participated();
  };

  _renderNewCampaigns = upComingCampaigns => {
    if (upComingCampaigns && upComingCampaigns.length) {
      return (
        <React.Fragment>
          <SeeAll
            icon={Images.new_campaigns}
            text={Strings.newly_added}
            onPress={
              upComingCampaigns.length === ITEM_LIMIT
                ? this._onNewlyPress
                : undefined
            }
          />
          <CampaignListHorizontal data={upComingCampaigns} />
        </React.Fragment>
      );
    }
    return null;
  };

  _renderMissedCampaigns = missedCampaigns => {
    if (missedCampaigns && missedCampaigns.length) {
      return (
        <React.Fragment>
          <SeeAll
            icon={Images.campaigns}
            text={Strings.missed}
            onPress={
              missedCampaigns.length === ITEM_LIMIT
                ? this._onMissedPress
                : undefined
            }
          />
          <CampaignListHorizontal data={missedCampaigns} />
        </React.Fragment>
      );
    }
    return null;
  };

  _renderParticipatedCampaigns = participatedCampaigns => {
    if (participatedCampaigns && participatedCampaigns.length) {
      return (
        <React.Fragment>
          <SeeAll
            icon={Images.campaigns}
            text={Strings.participated}
            onPress={
              participatedCampaigns.length === ITEM_LIMIT
                ? this._onParticipatedPress
                : undefined
            }
          />
          <CampaignListHorizontal data={participatedCampaigns} />
        </React.Fragment>
      );
    }
    return null;
  };

  _renderEmptyView = (errorMessage = "", errorRequest = undefined) => {
    return (
      <View style={ApplicationStyles.scrollContainer}>
        <EmptyView
          image={Images.emptyImages.campaigns}
          title={Strings.emptyTitles.home}
          description={Strings.emptyDescriptions.home}
          errorMessage={errorMessage}
          onPress={
            errorMessage !== "" && errorRequest
              ? () => errorRequest()
              : undefined
          }
          bottomStyle={{ paddingHorizontal: Metrics.baseMargin * 1.25 }}
        />
      </View>
    );
  };

  renderContent = hasData => {
    const {
      isFetching,
      isPullToRefresh,
      errorMessage,
      failure,
      data
    } = this.props.home;

    const {
      featuredCampaignsArray,
      upComingCampaignsArray,
      missedCampaignsArray,
      participatedCampaignsArray
    } = data;

    if (isFetching && !isPullToRefresh && !hasData) {
      return <Loading loading showNative={false} image={Images.gifs.loader} />;
    }

    if (!isFetching && !hasData && failure) {
      return this._renderEmptyView(errorMessage, this._fetchData);
    }

    if ((!isFetching || isPullToRefresh) && !hasData) {
      return this._renderEmptyView();
    }

    return (
      <React.Fragment>
        {featuredCampaignsArray && featuredCampaignsArray.length > 0 && (
          <CampaignCarousel data={featuredCampaignsArray} />
        )}

        {this._renderNewCampaigns(upComingCampaignsArray)}
        {this._renderParticipatedCampaigns(participatedCampaignsArray)}
        {this._renderMissedCampaigns(missedCampaignsArray)}
      </React.Fragment>
    );
  };

  render() {
    const { isPullToRefresh, failure, data } = this.props.home;

    const {
      featuredCampaignsArray,
      upComingCampaignsArray,
      missedCampaignsArray,
      participatedCampaignsArray
    } = data;

    const hasData =
      (featuredCampaignsArray && featuredCampaignsArray.length > 0) ||
      (upComingCampaignsArray && upComingCampaignsArray.length > 0) ||
      (missedCampaignsArray && missedCampaignsArray.length > 0) ||
      (participatedCampaignsArray && participatedCampaignsArray.length > 0);

    return (
      <View style={ApplicationStyles.scrollContainer}>
        <Header
          onUserPress={this._onUserPress}
          onFilterPress={this._onFilterPress}
          onNotificationPress={this._onNotificationPress}
        />
        {this._renderSearchContainer()}

        <ScrollView
          contentContainerStyle={
            failure && !hasData ? ApplicationStyles.flex : {}
          }
          // style={{ backgroundColor: Colors.background.quaternary }}
          refreshControl={
            <RefreshControl
              refreshing={isPullToRefresh}
              onRefresh={this._onPullToRefresh}
            />
          }
        >
          {this.renderContent(hasData)}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ user, home }) => ({ user_id: user.data.id, home });

const actions = { generalAction, generalListingRequest };

export default connect(mapStateToProps, actions)(Home);
