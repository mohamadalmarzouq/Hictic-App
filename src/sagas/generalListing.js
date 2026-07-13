import {put, call, takeEvery} from 'redux-saga/effects';
import ApiSauce from '../services/ApiSauce';
import {
  generalListingSuccess,
  generalListingFailure,
} from '../actions/GeneralListingActions';
import {GENERAL_REQUEST_LISTING} from '../actions/ActionTypes';
import Utils from '../utils';

function callRequest(url, payload) {
  return ApiSauce.get(url, payload);
}

function* watchGeneralRequest(action) {
  const {url, payload, requestType, cb} = action;
  try {
    if (requestType) {
      yield put({
        type: requestType.REQUEST,
        payload,
      });
    }

    const response = yield call(callRequest, url, payload);

    if (requestType) {
      yield put(
        generalListingSuccess(
          requestType.SUCCESS,
          response.data || [],
          response.page || {},
        ),
      );
    }
    if (cb) cb();
  } catch (err) {
    const errorMessage = err.api_message || err.message;

    if (requestType) {
      yield put(generalListingFailure(requestType.FAILURE, errorMessage));
    }

    Utils.showMessage(errorMessage);
  }
}

export default function* root() {
  yield takeEvery(GENERAL_REQUEST_LISTING, watchGeneralRequest);
}
