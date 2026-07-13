import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import PropTypes from "prop-types";

import { FlatListHandled } from "../../specifics";
import { ApplicationStyles, Metrics } from "../../theme";
import RewardItem from "./item";
import Utils from "../../utils";

//
import { connect } from "react-redux";
import { generalListingRequest } from "../../actions/GeneralListingActions";
import { API_REWARDS } from "../../config/WebService";
import { REWARDS_RECEIVED, REWARDS_SENT } from "../../actions/ActionTypes";

class RewardList extends React.PureComponent {
  static propTypes = {
    generalListingRequest: PropTypes.func.isRequired,
    user_id: PropTypes.any.isRequired,
    requestType: PropTypes.any.isRequired,
    hideLoading: PropTypes.bool,
  };

  static defaultProps = {
    hideLoading: false,
  };

  componentDidMount() {
    const { data } = this.props.data;
    this._fetchData(!!data.length);
  }

  _fetchData = (isPullToRefresh = false, page = 1) => {
    const { generalListingRequest, user_id, requestType } = this.props;

    let type = "won";

    if (requestType === REWARDS_RECEIVED) {
      type = "received";
    } else if (requestType === REWARDS_SENT) {
      type = "sent";
    }

    generalListingRequest(
      API_REWARDS,
      {
        user: user_id,
        isPullToRefresh: isPullToRefresh,
        type,
        page,
      },
      requestType
    );
  };

  _renderItem = ({ item, index }) => {
    const { user_id } = this.props;
    return (
      <RewardItem item={item.campaign_id} isLoginUser={item.user === user_id} />
    );
  };

  _onRefresh = () => {
    this._fetchData(true);
  };

  _onEndReach = () => {
    const { isFetching, isPullToRefresh, page } = this.props.data;

    if (!isFetching && page && page.next_page_url && !isPullToRefresh) {
      this._fetchData(false, page.current_page + 1);
    }
  };

  render() {
    const { data, isFetching, isPullToRefresh, errorMessage } = this.props.data;

    const {
      emptyTitle,
      emptyDescription,
      emptyImage,
      hideLoading,
    } = this.props;

    return (
      <FlatListHandled
        style={ApplicationStyles.scrollContainer}
        renderItem={this._renderItem}
        onRefresh={this._onRefresh}
        onEndReached={this._onEndReach}
        // custom props
        data={data}
        contentContainerStyle={{ paddingBottom: Metrics.baseMargin }}
        isFetching={isFetching}
        isPullToRefresh={isPullToRefresh}
        errorMessage={errorMessage}
        errorRequest={this._fetchData}
        emptyImage={emptyImage}
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
        hideLoading={hideLoading}
      />
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user_id: user.data.id,
});

const actions = { generalListingRequest };

export default connect(mapStateToProps, actions)(RewardList);
