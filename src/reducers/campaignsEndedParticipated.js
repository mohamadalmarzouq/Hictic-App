import _ from 'lodash';
import Immutable from 'seamless-immutable';
import {CAMPAIGNS_LISTING_ENDED_PARTICIPATED} from '../actions/ActionTypes';

const initialState = Immutable({
  data: [],
  isFetching: false,
  isPullToRefresh: false,
  errorMessage: '',
  page: {},
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case CAMPAIGNS_LISTING_ENDED_PARTICIPATED.REQUEST:
      return Immutable.merge(state, {
        isFetching: true,
        isPullToRefresh: action.payload.isPullToRefresh || false,
      });

    case CAMPAIGNS_LISTING_ENDED_PARTICIPATED.SUCCESS: {
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
        isFetching: false,
        isPullToRefresh: false,
        page: action.page,
        errorMessage:''
      });
    }

    case CAMPAIGNS_LISTING_ENDED_PARTICIPATED.FAILURE:
      return Immutable.merge(state, {
        isFetching: false,
        isPullToRefresh: false,
        errorMessage: action.errorMessage,
      });

    default:
      return state;
  }
};
