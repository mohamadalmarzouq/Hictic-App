// @flow
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE].forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

export const NETWORK_INFO = 'NETWORK_INFO';
export const GENERAL_REQUEST = 'GENERAL_REQUEST';

// login types
export const LOGIN_USER = createRequestTypes('LOGIN_USER');
export const LOGOUT_USER = 'LOGOUT_USER';
export const UPDATE_CHUNK_USER = 'UPDATE_CHUNK_USER';
export const UPDATE_SETTINGS = createRequestTypes('UPDATE_SETTINGS');

// campaign types
export const GENERAL_REQUEST_LISTING = 'GENERAL_REQUEST_LISTING';
export const GENERAL_REQUEST_SEARCH_LISTING = 'GENERAL_REQUEST_SEARCH_LISTING';

export const CAMPAIGNS_LISTING_INTERESTED = createRequestTypes(
  'CAMPAIGNS_LISTING_INTERESTED',
);
export const CAMPAIGNS_LISTING_MISSED = createRequestTypes(
  'CAMPAIGNS_LISTING_MISSED',
);
export const CAMPAIGNS_LISTING_RUNNING_NEW = createRequestTypes(
  'CAMPAIGNS_LISTING_RUNNING_NEW',
);
export const CAMPAIGNS_LISTING_UPCOMING_NEW = createRequestTypes(
  'CAMPAIGNS_LISTING_UPCOMING_NEW',
);
export const CAMPAIGNS_LISTING_RUNNING_PARTICIPATED = createRequestTypes(
  'CAMPAIGNS_LISTING_RUNNING_PARTICIPATED',
);
export const CAMPAIGNS_LISTING_ENDED_PARTICIPATED = createRequestTypes(
  'CAMPAIGNS_LISTING_ENDED_PARTICIPATED',
);
export const CAMPAIGNS_LISTING_SEARCHED = createRequestTypes(
  'CAMPAIGNS_LISTING_SEARCHED',
);
export const CAMPAIGNS_LISTING_FILTERED = createRequestTypes(
  'CAMPAIGNS_LISTING_FILTERED',
);

export const CLEAR_SEARCHED_CAMPAIGNS = 'CLEAR_SEARCHED_CAMPAIGNS';
export const CLEAR_FILTERED_CAMPAIGNS = 'CLEAR_FILTERED_CAMPAIGNS';
export const CLEAR_SEARCHED_USERS = 'CLEAR_SEARCHED_USERS';

export const CAMPAIGN_DETAILS = createRequestTypes('CAMPAIGN_DETAILS');
export const CAMPAIGN_INTERESTED = createRequestTypes('CAMPAIGN_INTERESTED');
export const CAMPAIGN_VIEWED = createRequestTypes('CAMPAIGN_VIEWED');
export const CAMPAIGN_PARTICIPATED = createRequestTypes(
  'CAMPAIGN_PARTICIPATED',
);

export const HOME = createRequestTypes('HOME');
export const NOTIFICATIONS = createRequestTypes('NOTIFICATIONS');
export const LEADER_BOARD = createRequestTypes('LEADER_BOARD');
export const LEADER_BOARD_CLEAR = 'LEADER_BOARD_CLEAR';
export const FILTER = createRequestTypes('FILTER');
export const NOTIFICATION_COUNT = 'NOTIFICATION_COUNT';
export const NOTIFICATION_COUNT_ADD = 'NOTIFICATION_COUNT_ADD';

export const REWARDS = createRequestTypes('REWARDS');
export const REWARDS_WON = createRequestTypes('REWARDS_WON');
export const REWARDS_RECEIVED = createRequestTypes('REWARDS_RECEIVED');
export const REWARDS_SENT = createRequestTypes('REWARDS_SENT');
export const UPDATE_REWARD_REDEEMED = 'UPDATE_REWARD_REDEEMED';

export const USERS_SEARCHED = createRequestTypes('USERS_SEARCHED');
