import {UPDATE_SETTINGS, NOTIFICATION_COUNT} from './ActionTypes';

export function request(payload) {
  return {
    type: UPDATE_SETTINGS.REQUEST,
    payload,
  };
}

export function updateNotificationCount(count) {
  return {
    type: NOTIFICATION_COUNT,
    data: {
      notifications_count: count,
    },
  };
}
