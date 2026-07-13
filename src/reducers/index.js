import {combineReducers} from 'redux';
import {LOGOUT_USER} from '../actions/ActionTypes';

// import navigator from './navigator';
import networkInfo from './networkInfo';
import user from './user';
import home from './home';
import campaigns from './campaigns';
import rewards from './rewards';
import rewardsWon from './rewardsWon';
import rewardsReceived from './rewardsReceived';
import rewardsSent from './rewardsSent';
import notifications from './notifications';
import leaderBoard from './leaderBoard';

import campaignsInterested from './campaignsInterested';
import campaignsMissed from './campaignsMissed';
import campaignsRunningNew from './campaignsRunningNew';
import campaignsUpComingNew from './campaignsUpComingNew';
import campaignsRunningParticipated from './campaignsRunningParticipated';
import campaignsEndedParticipated from './campaignsEndedParticipated';
import campaignsSearched from './campaignsSearched';
import campaignsFiltered from './campaignsFiltered';

import filter from './filter';
import usersSearched from './usersSearched';

const appReducer = combineReducers({
  // navigator,
  networkInfo,
  user,
  home,
  campaigns,
  rewards,
  rewardsWon,
  rewardsReceived,
  rewardsSent,
  notifications,
  leaderBoard,
  campaignsInterested,
  campaignsMissed,
  campaignsRunningNew,
  campaignsUpComingNew,
  campaignsRunningParticipated,
  campaignsEndedParticipated,
  campaignsSearched,
  campaignsFiltered,
  filter,
  usersSearched,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    const {networkInfo} = state;
    state = {networkInfo};
  }
  return appReducer(state, action);
};

export default rootReducer;
