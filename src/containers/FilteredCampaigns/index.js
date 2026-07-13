import React from 'react';
import {View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {SearchView} from '../../components';
import {CampaignList} from '../../specifics';
import {Metrics, Colors, ApplicationStyles, Strings} from '../../theme';

import {
  CAMPAIGNS_LISTING_FILTERED,
  CLEAR_FILTERED_CAMPAIGNS,
} from '../../actions/ActionTypes';
import {generalDispatchType} from '../../actions/GeneralAction';

class FilteredCampaigns extends React.PureComponent {
  componentWillUnmount() {
    this.props.generalDispatchType(CLEAR_FILTERED_CAMPAIGNS);
  }

  render() {
    const {campaignsFiltered} = this.props;
    const {selectedItems}=this.props.route.params
    return (
      <View style={ApplicationStyles.scrollContainer}>
        <CampaignList
          data={campaignsFiltered}
          emptyTitle={Strings.emptyTitles.filteredCampaigns}
          emptyDescription={Strings.emptyDescriptions.filteredCampaigns}
          initialPayload={selectedItems}
          requestType={CAMPAIGNS_LISTING_FILTERED}
        />
      </View>
    );
  }
}

const mapStateToProps = ({campaignsFiltered}) => ({
  campaignsFiltered,
});

const actions = {generalDispatchType};

export default connect(mapStateToProps, actions)(FilteredCampaigns);
