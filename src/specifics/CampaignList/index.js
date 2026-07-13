import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FlatListHandled, CampaignItem1, CampaignItem2} from '../../specifics';
import {ApplicationStyles, Metrics, Images, Colors} from '../../theme';
import {generalListingRequest} from '../../actions/GeneralListingActions';
import {API_CAMPAIGN_LISTING} from '../../config/WebService';
import Utils from '../../utils';

class CampaignList extends React.PureComponent {
  static propTypes = {
    request: PropTypes.func,
    data: PropTypes.object.isRequired,
    modalLoading: PropTypes.bool,
    hideLoading: PropTypes.bool,
  };

  static defaultProps = {
    request: undefined,
    modalLoading: false,
    hideLoading: false,
  };

  componentDidMount() {
    const {data} = this.props.data;

    this._fetchCampaigns(!!data.length);
  }

  _fetchCampaigns = (isPullToRefresh = false, page = 1) => {
    const {
      request,
      generalListingRequest,
      user_id,
      initialPayload,
      requestType,
    } = this.props;

    if (request) {
      request(isPullToRefresh, page);
    } else {
      generalListingRequest(
        API_CAMPAIGN_LISTING,
        {
          user_id: user_id,
          isPullToRefresh: isPullToRefresh,
          page,
          ...initialPayload,
        },
        requestType,
      );
    }
  };

  _renderItem = ({item, index}) => <CampaignItem1 item={item} />;

  _onRefresh = () => {
    this._fetchCampaigns(true);
  };

  _onEndReach = () => {
    const {isFetching, isPullToRefresh, page} = this.props.data;

    if (!isFetching && page && page.next_page_url && !isPullToRefresh) {
      this._fetchCampaigns(false, page.current_page + 1);
    }
  };

  render() {
    const {data, isFetching, isPullToRefresh, errorMessage} = this.props.data;

    const {emptyTitle, emptyDescription, modalLoading, hideLoading} =
      this.props;

    return (
      <FlatListHandled
        isFetching={isFetching}
        isPullToRefresh={isPullToRefresh}
        onRefresh={this._onRefresh}
        onEndReached={this._onEndReach}
        style={{backgroundColor: Colors.background.primary}}
        contentContainerStyle={[
          {paddingHorizontal: Metrics.baseMargin * 1.25},
          {paddingTop: Metrics.smallMargin},
        ]}
        data={data}
        renderItem={this._renderItem}
        errorMessage={errorMessage}
        errorRequest={this.props.request || this._fetchCampaigns}
        emptyImage={Images.emptyImages.campaigns}
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
        modalLoading={modalLoading}
        hideLoading={hideLoading}
      />
    );
  }
}

const mapStateToProps = ({user}) => ({
  user_id: user.data.id,
});

const actions = {generalListingRequest};

export default connect(mapStateToProps, actions)(CampaignList);
