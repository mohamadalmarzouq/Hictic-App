import React from 'react';
import {View, FlatList, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Separator} from '../../components';
import {FlatListHandled} from '../../specifics';
import {ApplicationStyles, Images, Strings} from '../../theme';

// redux
import {connect} from 'react-redux';
import {NOTIFICATIONS} from '../../actions/ActionTypes';
import {generalListingRequest} from '../../actions/GeneralListingActions';
import {updateNotificationCount} from '../../actions/SettingsAction';
import {API_NOTIFICATIONS} from '../../config/WebService';
import NotificationItem from './item';

class Notifications extends React.PureComponent {
  static propTypes = {
    generalListingRequest: PropTypes.func.isRequired,
    user_id: PropTypes.number.isRequired,
    notifications: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const {data} = this.props.notifications;
    this._fetchData(!!data.length);
  }

  _fetchData = (isPullToRefresh = false, page = 1) => {
    const {user_id, generalListingRequest, updateNotificationCount} =
      this.props;

    generalListingRequest(
      API_NOTIFICATIONS,
      {
        reciever: user_id,
        isPullToRefresh: isPullToRefresh,
        page,
      },
      NOTIFICATIONS,
      () => {
        // updateNotificationCount(0);
      },
    );
  };

  _onRefresh = () => {
    this._fetchData(true);
  };

  _onEndReach = () => {
    const {isFetching, isPullToRefresh, page} = this.props.notifications;

    if (!isFetching && page && page.next_page_url && !isPullToRefresh) {
      this._fetchData(false, page.current_page + 1);
    }
  };

  _renderItem = ({item}) => {
    return <NotificationItem item={item} />;
  };

  render() {
    const {data, isFetching, isPullToRefresh, errorMessage} =
      this.props.notifications;
    return (
      <FlatListHandled
        style={ApplicationStyles.scrollContainer}
        renderItem={this._renderItem}
        onRefresh={this._onRefresh}
        onEndReached={this._onEndReach}
        ItemSeparatorComponent={() => <Separator />}
        // custom
        data={data}
        isFetching={isFetching}
        isPullToRefresh={isPullToRefresh}
        errorMessage={errorMessage}
        errorRequest={this._fetchData}
        emptyImage={Images.emptyImages.notifications}
        emptyTitle={Strings.emptyTitles.notifications}
        emptyDescription={Strings.emptyDescriptions.notifications}
        hideLoading
      />
    );
  }
}

const mapStateToProps = ({user, notifications}) => ({
  user_id: user.data.id,
  notifications,
});

const actions = {
  generalListingRequest,
  updateNotificationCount,
};

export default connect(mapStateToProps, actions)(Notifications);
