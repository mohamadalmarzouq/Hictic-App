import React from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Separator, Loading, Progress} from '../../components';
import {RoundImage, EmptyView} from '../../specifics';
import {Images, ApplicationStyles, Metrics, Colors, Strings} from '../../theme';
import Utils from '../../utils';
import styles from './styles';

//
import {connect} from 'react-redux';
import {LEADER_BOARD, LEADER_BOARD_CLEAR} from '../../actions/ActionTypes';
import {generalListingRequest} from '../../actions/GeneralListingActions';
import {generalDispatchType} from '../../actions/GeneralAction';
import {API_LEADER_BOARD} from '../../config/WebService';

class LeaderBoard extends React.PureComponent {
  componentDidMount() {
    this._fetchData();
  }

  componentWillUnmount() {
    this.props.generalDispatchType(LEADER_BOARD_CLEAR);
  }

  _fetchData = (isPullToRefresh = false, page = 1) => {
    const {generalListingRequest} = this.props;
    const {campaign_id}=this.props.route.params

    generalListingRequest(
      API_LEADER_BOARD,
      {
        campaign_id: campaign_id,
        isPullToRefresh: isPullToRefresh,
        page,
      },
      LEADER_BOARD,
    );
  };

  _onPullToRefresh = () => {
    this._fetchData(true);
  };

  _renderHeader = () => {
    const {data} = this.props.leaderBoard;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerImage}>
          <Image source={Images.winners} />
        </View>
        <View style={ApplicationStyles.flexRow}>
          {this._renderHeaderItem(data[1])}
          {this._renderHeaderItem(data[0], true)}
          {this._renderHeaderItem(data[2])}
        </View>
      </View>
    );
  };

  _renderHeaderItem = (item, isWinner = false) => {
    if (!item) {
      return (
        <View
          style={[
            styles.headerItemContainer,
            {
              paddingTop: isWinner ? 0 : Metrics.ratio(60),
            },
          ]}
        />
      );
    }

    const {score, user_id} = item;
    const {avatar, full_name} = user_id;

    return (
      <View
        style={[
          styles.headerItemContainer,
          {
            paddingTop: isWinner ? 0 : Metrics.ratio(60),
          },
        ]}>
        <RoundImage
          containerStyle={styles.headerItemImage}
          image={avatar}
          imageSize={isWinner ? 100 : 75}
          hideShadow
          imageBorderColor={
            isWinner ? Colors.background.septenary : Colors.background.senary
          }
          imageBorderWidth={isWinner ? 9 : 6}
          rightIcon={isWinner ? Images.crown : 0}
          isUser
          resizeMode="cover"
        />
        <Text
          style={[
            ApplicationStyles.b17Primary,
            {
              paddingHorizontal: Utils.isPlatformAndroid()
                ? 0
                : Metrics.smallMargin / 2,
            },
          ]}
          numberOfLines={1}>
          {full_name}
        </Text>
        <Text style={ApplicationStyles.re15Primary}>
          {Utils.formatNumberComma(score)}
        </Text>
      </View>
    );
  };

  _renderItem = ({item, index}) => {
    const {score, user_id} = item;
    const {avatar, full_name} = user_id;

    return (
      <View style={styles.listItem}>
        <Text style={ApplicationStyles.m17Secondary}>{index + 4}</Text>
        <RoundImage
          containerStyle={styles.listItemImage}
          image={avatar}
          imageSize={45}
          hideShadow
          imageBorderWidth={0}
          isUser
        />

        <Text
          style={[ApplicationStyles.sb17Secondary, ApplicationStyles.flex]}
          numberOfLines={1}>
          {full_name}
        </Text>

        <Text
          style={[
            ApplicationStyles.sb17Secondary,
            ApplicationStyles.textRight,
          ]}>
          {Utils.formatNumberComma(score)}
        </Text>
      </View>
    );
  };

  _renderEmptyView = (errorMessage = '', errorRequest = undefined) => {
    return (
      <View style={ApplicationStyles.scrollContainer}>
        <EmptyView
          image={Images.emptyImages.rewards}
          title={Strings.emptyTitles.leaderBoard}
          description={Strings.emptyDescriptions.leaderBoard}
          errorMessage={errorMessage}
          onPress={
            errorMessage !== '' && errorRequest
              ? () => errorRequest()
              : undefined
          }
          bottomStyle={{paddingHorizontal: Metrics.baseMargin * 1.25}}
        />
      </View>
    );
  };

  _renderFooter = () => {
    const {data, isPullToRefresh, isFetching} = this.props.leaderBoard;

    if (data && data.length > 0 && isFetching && !isPullToRefresh) {
      return <Progress style={{padding: Metrics.baseMargin}} />;
    }
    return null;
  };

  _onEndReach = () => {
    const {isFetching, isPullToRefresh, page} = this.props.leaderBoard;

    if (!isFetching && page && page.next_page_url && !isPullToRefresh) {
      this._fetchData(false, page.current_page + 1);
    }
  };

  renderContent = () => {
    const {data, isFetching, isPullToRefresh, errorMessage, failure} =
      this.props.leaderBoard;

    if (!data.length && isFetching && !isPullToRefresh) {
      return (
        <Loading
          loading
          showNative={false}
          loaderColor={Colors.background.primary}
          image={Images.gifs.loader}
        />
      );
    }

    if (!isFetching && !data.length && failure) {
      return this._renderEmptyView(errorMessage, this._fetchData);
    }

    if (!isFetching && !data.length && !failure) {
      return this._renderEmptyView();
    }

    return (
      <View
        style={[
          {paddingHorizontal: Metrics.baseMargin * 1.25},
          data.length > 3 ? {} : ApplicationStyles.flex,
        ]}>
        {this._renderHeader()}
        {data.length && (
          <FlatList
            data={data.slice(3, data.length)}
            renderItem={this._renderItem}
            style={styles.listStyle}
            ItemSeparatorComponent={() => (
              <Separator style={styles.listItemSeparator} />
            )}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this._renderFooter}
            onEndReached={this._onEndReach}
            ListEmptyComponent={() => (
              <Text
                style={[
                  ApplicationStyles.re16Secondary,
                  {
                    marginHorizontal: Metrics.baseMargin * 1.25,
                    textAlign: 'center',
                  },
                ]}>
                {Strings.emptyDescriptions.leaderBoard2}
              </Text>
            )}
            contentContainerStyle={
              data.length > 3 ? {} : ApplicationStyles.emptyListContainerStyle
            }
          />
        )}
      </View>
    );
  };

  render() {
    const {data, isPullToRefresh, failure} = this.props.leaderBoard;

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainerStyle,
          data.length > 3 ? {} : ApplicationStyles.flex,
        ]}
        refreshControl={
          failure ? null : (
            <RefreshControl
              refreshing={isPullToRefresh}
              onRefresh={this._onPullToRefresh}
            />
          )
        }
        bounces={!failure}>
        {this.renderContent()}
      </ScrollView>
    );
  }
}

const mapStateToProps = ({leaderBoard}) => ({
  leaderBoard,
});

const actions = {generalListingRequest, generalDispatchType};

export default connect(mapStateToProps, actions)(LeaderBoard);
