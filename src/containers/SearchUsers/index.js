import React from 'react';
import {View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {SearchView, ButtonView} from '../../components';
import {FlatListHandled, RoundImage} from '../../specifics';
import {Metrics, Colors, ApplicationStyles, Strings, Images} from '../../theme';
import {API_USERS_SEARCH, API_SHARE_COUPON} from '../../config/WebService';
import {USERS_SEARCHED, CLEAR_SEARCHED_USERS} from '../../actions/ActionTypes';

import {generalListingSearchRequest} from '../../actions/GeneralListingActions';
import {generalAction, generalDispatchType} from '../../actions/GeneralAction';
import {WithFetching} from '../../HOC';
import Utils from '../../utils';

import Item from './Item';

const styles = {
  searchContainer: {
    backgroundColor: Colors.background.quaternary,
    paddingBottom: Metrics.baseMargin,
  },
  footerContainer: {
    marginHorizontal: Metrics.baseMargin * 1.5,
    paddingVertical: Metrics.smallMargin,
    marginVertical: Metrics.mediumMargin,
  },
};

class SearchUsers extends React.PureComponent {
  componentWillUnmount() {
    this.props.generalDispatchType(CLEAR_SEARCHED_USERS);
  }

  componentDidMount() {
    const {data} = this.props.usersSearched;

    this._fetchData();
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
      API_USERS_SEARCH,
      {
        id: user_id,
        isPullToRefresh: isPullToRefresh,
        keyword: searchValue,
        isSearch: isSearch,
        page,
      },
      USERS_SEARCHED,
    );
  };

  _onSearchTextChanged = value => {
    this.setState({searchValue: value});
    this._fetchData(false, 1, value, true);
  };

  _renderSearchContainer = () => {
    const {isSearch} = this.props.usersSearched;
    return (
      <View style={styles.searchContainer}>
        <SearchView
          onChangeText={this._onSearchTextChanged}
          isSearch={isSearch}
          placeholder="Search by name or email..."
        />
      </View>
    );
  };

  _renderItem = ({item, index}) => (
    <Item item={item} onPress={this._onUserPress} />
  );

  _onRefresh = () => {
    this._fetchData(true);
  };

  _onEndReach = () => {
    const {isFetching, isPullToRefresh, page} = this.props.usersSearched;

    if (!isFetching && page && page.next_page_url && !isPullToRefresh) {
      this._fetchData(false, page.current_page + 1);
    }
  };

  _onInvitePress = () => {
    // Actions.invite();
    this.props.navigation.navigate("invite")
  };

  _onUserPress = user => {
    // alert(user.id);
    this._shareReward(user);
  };

  _shareReward = targetUser => {
    const {user_id, generalAction, cbShowLoader} = this.props;
    const {coupon_id}=this.props.route.params

    cbShowLoader(true);
    generalAction(
      API_SHARE_COUPON,
      {
        coupon_id: coupon_id,
        sent_by: user_id,
        sent_to: targetUser.id,
      },
      '',
      '',
      data => {
        cbShowLoader(false);
        Utils.showMessage(Strings.coupon_shared, 'success');
      },
      error => {
        cbShowLoader(false);
      },
      false,
      false,
      true,
    );
  };

  render() {
    const {data, isFetching, isPullToRefresh, errorMessage} =
      this.props.usersSearched;

    return (
      <View style={ApplicationStyles.scrollContainer}>
        {this._renderSearchContainer()}

        <FlatListHandled
          renderItem={this._renderItem}
          onRefresh={this._onRefresh}
          onEndReached={this._onEndReach}
          // custom props
          data={data}
          isFetching={isFetching}
          isPullToRefresh={isPullToRefresh}
          errorMessage={errorMessage}
          errorRequest={this._fetchData}
          emptyImage={Images.emptyImages.error}
          emptyTitle={Strings.emptyTitles.searchUsers}
          emptyDescription={Strings.emptyDescriptions.searchUsers}
          modalLoading
        />
        <ButtonView
          style={styles.footerContainer}
          onPress={this._onInvitePress}>
          <Text style={ApplicationStyles.sb17Septenary}>{Strings.invite}</Text>
        </ButtonView>
      </View>
    );
  }
}

const mapStateToProps = ({user, usersSearched}) => ({
  user_id: user.data.id,
  usersSearched,
});

const actions = {
  generalAction,
  generalDispatchType,
  generalListingSearchRequest,
};

export default connect(mapStateToProps, actions)(WithFetching(SearchUsers));
