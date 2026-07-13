// @flow
import _ from 'lodash';
import Immutable from 'seamless-immutable';
import {
  CAMPAIGN_DETAILS,
  CAMPAIGN_INTERESTED,
  CAMPAIGN_VIEWED,
  CAMPAIGN_PARTICIPATED,
} from '../actions/ActionTypes';

const initialState = Immutable({
  failure: false,
  isFetching: false,
  errorMessage: '',
  data: {},
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case CAMPAIGN_DETAILS.REQUEST:
      return Immutable.merge(state, {
        isFetching: true,
        errorMessage: '',
        failure: false,
      });
    case CAMPAIGN_DETAILS.SUCCESS: {
      const data = _.cloneDeep(state.data);

      data[action.data.id] = action.data;

      return Immutable.merge(state, {
        data,
        failure: false,
        isFetching: false,
        errorMessage: '',
      });
    }

    case CAMPAIGN_DETAILS.FAILURE: {
      return Immutable.merge(state, {
        failure: true,
        isFetching: false,
        errorMessage: action.message,
      });
    }

    // case CAMPAIGN_INTERESTED.REQUEST: {
    //   const data = _.cloneDeep(state.data);
    //   if (data[action.data.campaign_id]) {
    //     data[action.data.campaign_id].interestedFetching = true;
    //     return Immutable.merge(state, { data });
    //   }
    //   return state;
    // }

    case CAMPAIGN_INTERESTED.SUCCESS: {
      const data = _.cloneDeep(state.data);
      if (data[action.data.campaign_id]) {
        data[action.data.campaign_id].is_interested =
          data[action.data.campaign_id].is_interested === 1 ? 0 : 1;
        // data[action.data.campaign_id].interestedFetching = false;
        // data[action.data.campaign_id].interestedSuccess = true;

        return Immutable.merge(state, {
          data,
        });
      }

      return state;
    }

    // case CAMPAIGN_INTERESTED.FAILURE: {
    //   const data = _.cloneDeep(state.data);
    //   if (data[action.campaign_id]) {
    //     data[action.campaign_id].interestedFetching = false;
    //     data[action.campaign_id].interestedSuccess = false;
    //     return Immutable.merge(state, {
    //       data
    //     });
    //   }
    //   return state;
    // }

    // case PRODUCT_LIKE.SUCCESS: {
    //   const data = _.cloneDeep(state.data);
    //   if (data[action.data.product_id]) {
    //     data[action.data.product_id].isFavourite = action.data.status;
    //     return Immutable.merge(state, {
    //       data
    //     });
    //   }
    //   return state;
    // }

    case CAMPAIGN_VIEWED.SUCCESS: {
      const data = _.cloneDeep(state.data);

      if (data[action.data.campaign_id]) {
        data[action.data.campaign_id].views_count =
          data[action.data.campaign_id].views_count + 1;

        data[action.data.campaign_id].is_viewed = 1;

        return Immutable.merge(state, {
          data,
        });
      }

      return state;
    }

    case CAMPAIGN_PARTICIPATED.SUCCESS: {
      const data = _.cloneDeep(state.data);

      if (data[action.data.campaign_id]) {
        data[action.data.campaign_id].is_participated = 1;

        return Immutable.merge(state, {
          data,
        });
      }

      return state;
    }

    default:
      return state;
  }
};
