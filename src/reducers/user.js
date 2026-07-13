import Immutable from 'seamless-immutable';
import {
  LOGIN_USER,
  UPDATE_CHUNK_USER,
  UPDATE_SETTINGS,
  NOTIFICATION_COUNT,
  NOTIFICATION_COUNT_ADD,
} from '../actions/ActionTypes';

const initialState = Immutable({
  data: {},
  notification_count: 0,
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case LOGIN_USER.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }

    case UPDATE_CHUNK_USER: {
      return Immutable.merge(state, {
        data: {...state.data, ...action.data},
      });
    }

    // case UPDATE_SETTINGS.SUCCESS:
    //   const data = {
    //     ...state.data,
    //     notification: action.data
    //   };
    //   return Immutable.merge(state, {
    //     data
    //   });

    case NOTIFICATION_COUNT: {
      return Immutable.merge(state, {
        notification_count: action.data.notifications_count,
      });
    }

    case NOTIFICATION_COUNT_ADD: {
      return Immutable.merge(state, {
        notification_count: state.notification_count + 1,
      });
    }

    default:
      return state;
  }
};
