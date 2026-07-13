import _ from 'lodash';
import Immutable from 'seamless-immutable';
import {
  CAMPAIGNS_LISTING_SEARCHED,
  CLEAR_SEARCHED_CAMPAIGNS,
} from '../actions/ActionTypes';

const initialState = Immutable({
  data: [],
  isFetching: false,
  isPullToRefresh: false,
  errorMessage: '',
  page: {},
  isSearch: false,
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case CAMPAIGNS_LISTING_SEARCHED.REQUEST:
      return Immutable.merge(state, {
        isFetching:
          action.payload.isSearch && action.payload.isSearch !== ''
            ? false
            : true,
        isPullToRefresh: action.payload.isPullToRefresh || false,
        isSearch: action.payload.isSearch || false,
      });

    case CAMPAIGNS_LISTING_SEARCHED.SUCCESS: {
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
        isSearch: false,
      });
    }

    case CAMPAIGNS_LISTING_SEARCHED.FAILURE:
      return Immutable.merge(state, {
        isFetching: false,
        isPullToRefresh: false,
        errorMessage: action.errorMessage,
        isSearch: false,
      });

    case CLEAR_SEARCHED_CAMPAIGNS:
      return initialState;

    default:
      return state;
  }
};
