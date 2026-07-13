import React from 'react';
import {CustomScrollAbleTabs} from '../../specifics';
import {Images, Strings} from '../../theme';

import {connect} from 'react-redux';
import {
  REWARDS_WON,
  REWARDS_RECEIVED,
  REWARDS_SENT,
} from '../../actions/ActionTypes';

import RewardList from './RewardList';

class Rewards extends React.PureComponent {
  render() {
    const {rewardsWon, rewardsReceived, rewardsSent} = this.props;
    return (
      <CustomScrollAbleTabs>
        <RewardList
          tabLabel={Strings.tabs.won}
          data={rewardsWon}
          emptyImage={Images.emptyImages.rewards}
          emptyTitle={Strings.emptyTitles.rewards}
          emptyDescription={Strings.emptyDescriptions.rewardsWon}
          requestType={REWARDS_WON}
          hideLoading
        />
        <RewardList
          tabLabel={Strings.tabs.received}
          data={rewardsReceived}
          emptyImage={Images.emptyImages.rewards}
          emptyTitle={Strings.emptyTitles.rewards}
          emptyDescription={Strings.emptyDescriptions.rewardsReceived}
          requestType={REWARDS_RECEIVED}
          hideLoading
        />
        <RewardList
          tabLabel={Strings.tabs.sent}
          data={rewardsSent}
          emptyImage={Images.emptyImages.rewards}
          emptyTitle={Strings.emptyTitles.rewards}
          emptyDescription={Strings.emptyDescriptions.rewardsSent}
          requestType={REWARDS_SENT}
          hideLoading
        />
      </CustomScrollAbleTabs>
    );
  }
}

const mapStateToProps = ({rewardsWon, rewardsReceived, rewardsSent}) => ({
  rewardsWon,
  rewardsReceived,
  rewardsSent,
});

export default connect(mapStateToProps, null)(Rewards);
