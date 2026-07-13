import React from 'react';
import {connect} from 'react-redux';
import {CampaignList, CustomScrollAbleTabs} from '../../specifics';

import {
  CAMPAIGNS_LISTING_RUNNING_PARTICIPATED,
  CAMPAIGNS_LISTING_ENDED_PARTICIPATED,
} from '../../actions/ActionTypes';
import {Strings} from '../../theme';

class Participated extends React.PureComponent {
  render() {
    const {campaignsRunningParticipated, campaignsEndedParticipated} =
      this.props;
    return (
      <CustomScrollAbleTabs isScrollable>
        <CampaignList
          tabLabel={Strings.tabs.running}
          data={campaignsRunningParticipated}
          emptyTitle={Strings.emptyTitles.runningCampaignsParticipated}
          emptyDescription={
            Strings.emptyDescriptions.runningCampaignsParticipated
          }
          initialPayload={{
            type: 'participated,running',
          }}
          requestType={CAMPAIGNS_LISTING_RUNNING_PARTICIPATED}
        />
        <CampaignList
          tabLabel={Strings.tabs.ended}
          data={campaignsEndedParticipated}
          emptyTitle={Strings.emptyTitles.endedCampaignsParticipated}
          emptyDescription={
            Strings.emptyDescriptions.endedCampaignsParticipated
          }
          initialPayload={{
            type: 'participated,ended',
          }}
          requestType={CAMPAIGNS_LISTING_ENDED_PARTICIPATED}
        />
      </CustomScrollAbleTabs>
    );
  }
}

const mapStateToProps = ({
  campaignsRunningParticipated,
  campaignsEndedParticipated,
}) => ({
  campaignsRunningParticipated,
  campaignsEndedParticipated,
});

export default connect(mapStateToProps, null)(Participated);
