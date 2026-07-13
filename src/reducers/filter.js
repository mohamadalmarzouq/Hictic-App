import Immutable from 'seamless-immutable';
import {FILTER} from '../actions/ActionTypes';

const initialState = Immutable({
  data: {},
  errorMessage: '',
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case FILTER.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
        errorMessage: '',
      });
    }

    case FILTER.FAILURE: {
      return Immutable.merge(state, {
        errorMessage: action.message,
      });
    }

    default:
      return state;
  }
};
