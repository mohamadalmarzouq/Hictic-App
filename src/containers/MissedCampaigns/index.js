import React from 'react';
import {connect} from 'react-redux';
import {CampaignList} from '../../specifics';
import {CAMPAIGNS_LISTING_MISSED} from '../../actions/ActionTypes';
import {Strings} from '../../theme';

class MissedCampaigns extends React.PureComponent {
  render() {
    const {campaignsMissed} = this.props;

    return (
      <CampaignList
        data={campaignsMissed}
        emptyTitle={Strings.emptyTitles.missedCampaigns}
        emptyDescription={Strings.emptyDescriptions.missedCampaigns}
        initialPayload={{
          type: 'missed',
        }}
        requestType={CAMPAIGNS_LISTING_MISSED}
      />
    );
  }
}

const mapStateToProps = ({campaignsMissed}) => ({
  campaignsMissed,
});

export default connect(mapStateToProps, null)(MissedCampaigns);
