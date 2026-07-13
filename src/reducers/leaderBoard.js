import _ from 'lodash';
import Immutable from 'seamless-immutable';
import {LEADER_BOARD, LEADER_BOARD_CLEAR} from '../actions/ActionTypes';

const initialState = Immutable({
  isFetching: false,
  errorMessage: '',
  failure: false,
  isPullToRefresh: false,
  data: [],
  page: {},
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case LEADER_BOARD.REQUEST: {
      return Immutable.merge(state, {
        isFetching: true,
        errorMessage: '',
        failure: false,
        isPullToRefresh: action.payload.isPullToRefresh || false,
      });
    }

    case LEADER_BOARD.SUCCESS: {
      let {data} = action;
      if (
        action.page &&
        action.page.current_page &&
        action.page.current_page > 1
      ) {
        data = _.concat(state.data, action.data);
      }

      return Immutable.merge(state, {
        data,
        page: action.page,
        failure: false,
        errorMessage: '',
        isFetching: false,
        isPullToRefresh: false,
      });
    }

    case LEADER_BOARD.FAILURE: {
      return Immutable.merge(state, {
        failure: true,
        errorMessage: action.errorMessage,
        isFetching: false,
        isPullToRefresh: false,
      });
    }

    case LEADER_BOARD_CLEAR:
      return initialState;

    default:
      return state;
  }
};
