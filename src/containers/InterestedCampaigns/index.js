import React from 'react';
import {connect} from 'react-redux';
import {CampaignList} from '../../specifics';
import {CAMPAIGNS_LISTING_INTERESTED} from '../../actions/ActionTypes';
import {Strings} from '../../theme';

class InterestedCampaigns extends React.PureComponent {
  render() {
    const {campaignsInterested} = this.props;

    return (
      <CampaignList
        data={campaignsInterested}
        emptyTitle={Strings.emptyTitles.interestedCampaigns}
        emptyDescription={Strings.emptyDescriptions.interestedCampaigns}
        initialPayload={{
          type: 'interested',
        }}
        requestType={CAMPAIGNS_LISTING_INTERESTED}
      />
    );
  }
}

const mapStateToProps = ({campaignsInterested}) => ({
  campaignsInterested,
});

export default connect(mapStateToProps, null)(InterestedCampaigns);
