// @flow
import _ from 'lodash';
import Immutable from 'seamless-immutable';
import {REWARDS, UPDATE_REWARD_REDEEMED} from '../actions/ActionTypes';

const initialState = Immutable({
  failure: false,
  isFetching: false,
  errorMessage: '',
  data: {},
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case REWARDS.REQUEST:
      return Immutable.merge(state, {
        isFetching: true,
        errorMessage: '',
        failure: false,
      });
    case REWARDS.SUCCESS: {
      const data = _.cloneDeep(state.data);

      // data[action.data.id] = action.data;
      data[action.data.coupon_detail.id] = action.data;

      return Immutable.merge(state, {
        data,
        failure: false,
        isFetching: false,
        errorMessage: '',
      });
    }

    case REWARDS.FAILURE: {
      return Immutable.merge(state, {
        failure: true,
        isFetching: false,
        errorMessage: action.message,
      });
    }

    case UPDATE_REWARD_REDEEMED: {
      const {coupon_id, coupon} = action.data;
      const data = _.cloneDeep(state.data);

      if (data[coupon_id]) {
        data[coupon_id].coupon_detail.coupon = coupon;
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
