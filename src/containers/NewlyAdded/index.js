import React from 'react';
import {connect} from 'react-redux';
import {CampaignList, CustomScrollAbleTabs} from '../../specifics';
import {
  CAMPAIGNS_LISTING_RUNNING_NEW,
  CAMPAIGNS_LISTING_UPCOMING_NEW,
} from '../../actions/ActionTypes';
import {Strings} from '../../theme';

class NewlyAdded extends React.PureComponent {
  render() {
    const {campaignsRunningNew, campaignsUpComingNew} = this.props;
    return (
      <CustomScrollAbleTabs>
        <CampaignList
          tabLabel={Strings.tabs.running}
          data={campaignsRunningNew}
          emptyTitle={Strings.emptyTitles.runningCampaignsNew}
          emptyDescription={Strings.emptyDescriptions.runningCampaignsNew}
          initialPayload={{
            type: 'newlyadded,running',
          }}
          requestType={CAMPAIGNS_LISTING_RUNNING_NEW}
        />
        <CampaignList
          tabLabel={Strings.tabs.upComing}
          data={campaignsUpComingNew}
          emptyTitle={Strings.emptyTitles.upcomingCampaignsNew}
          emptyDescription={Strings.emptyDescriptions.upcomingCampaignsNew}
          initialPayload={{
            type: 'newlyadded,upcoming',
          }}
          requestType={CAMPAIGNS_LISTING_UPCOMING_NEW}
        />
      </CustomScrollAbleTabs>
    );
  }
}

const mapStateToProps = ({campaignsRunningNew, campaignsUpComingNew}) => ({
  campaignsRunningNew,
  campaignsUpComingNew,
});

export default connect(mapStateToProps, null)(NewlyAdded);
