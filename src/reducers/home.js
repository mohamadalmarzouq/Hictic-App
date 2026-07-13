import _ from 'lodash';
import Immutable from 'seamless-immutable';
import {HOME} from '../actions/ActionTypes';

const initialState = Immutable({
  data: {},
  isFetching: false,
  isPullToRefresh: false,
  errorMessage: '',
  failure: false,
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case HOME.REQUEST: {
      return Immutable.merge(state, {
        isFetching: true,
        isPullToRefresh: action.payload.isPullToRefresh,
        failure: false,
      });
    }

    case HOME.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
        isFetching: false,
        isPullToRefresh: false,
        errorMessage: '',
        failure: false,
      });
      break;
    }

    case HOME.FAILURE: {
      return Immutable.merge(state, {
        isFetching: false,
        isPullToRefresh: false,
        errorMessage: action.errorMessage,
        failure: true,
      });
    }

    default:
      return state;
  }
};
