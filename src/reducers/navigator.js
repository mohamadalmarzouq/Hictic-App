import {Reducer, ActionConst} from 'react-native-router-flux';
import {combineReducers} from 'redux';

const defaultReducer = Reducer();

export default (state, action) => {
  switch (action.type) {
    case ActionConst.FOCUS:
      return defaultReducer(state, action);

    // default:
    //   return defaultReducer(state, action);
    default:
      return {};
  }
};
