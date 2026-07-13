import {put, call, takeLatest} from 'redux-saga/effects';
import ApiSauce from '../services/ApiSauce';
import {
  generalListingSuccess,
  generalListingFailure,
} from '../actions/GeneralListingActions';
import {GENERAL_REQUEST_SEARCH_LISTING} from '../actions/ActionTypes';
import Utils from '../utils';

function callRequest(url, payload) {
  return ApiSauce.get(url, payload);
}

function* watchGeneralRequest(action) {
  const {url, payload, requestType} = action;
  try {
    if (requestType) {
      yield put({
        type: requestType.REQUEST,
        payload,
      });
    }

    const response = yield call(callRequest, url, payload);

    yield put(
      generalListingSuccess(
        requestType.SUCCESS,
        response.data || [],
        response.page || {},
      ),
    );
  } catch (err) {
    const errorMessage = err.api_message || err.message;

    yield put(generalListingFailure(requestType.FAILURE, errorMessage));

    Utils.showMessage(errorMessage);
  }
}

export default function* root() {
  yield takeLatest(GENERAL_REQUEST_SEARCH_LISTING, watchGeneralRequest);
}
