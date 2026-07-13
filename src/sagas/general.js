import {put, call, takeEvery} from 'redux-saga/effects';
import {GENERAL_REQUEST} from '../actions/ActionTypes';
import ApiSauce from '../services/ApiSauce';
import {
  API_USER_LOGIN,
  API_USER_SIGN_UP,
  API_USER_SOCIAL_LOGIN,
} from '../config/WebService';
import Utils from '../utils';
import FirebaseUtils from '../utils/FirebaseUtils';

function callRequest(url, payload, isGetRequest) {
  if (isGetRequest) {
    return ApiSauce.get(url, payload);
  }
  return ApiSauce.post(url, payload);
}

function* watchGeneralRequest(action) {
  const {
    url,
    payload,
    successType,
    failureType,
    successCb,
    failureCb,
    returnCompleteResponse,
    isGetRequest,
    showAlert,
  } = action;
  try {
    // is login
    const isLogin =
      url === API_USER_LOGIN ||
      url === API_USER_SOCIAL_LOGIN ||
      url === API_USER_SIGN_UP;

    if (isLogin) {
      //get token and set payload for device token
      const token = yield FirebaseUtils.getTokenPromise();
      // const token = 'test';
      payload.device_token = token;
    }

    const response = yield call(callRequest, url, payload, isGetRequest);

    let responseData;

    if (returnCompleteResponse) {
      responseData = response;
    } else if (response.data) {
      responseData = response.data;
    } else if (response.success && response.success.data) {
      responseData = response.success.data;
    } else if (response.success && response.success.msg) {
      responseData = response.success.msg;
    } else {
      responseData = {};
    }

    if (successType) {
      yield put({
        type: successType,
        data: responseData,
        page: response.page || {},
      });
    }
    if (successCb) successCb(responseData);
  } catch (err) {
    const errorMessage = err.api_message || err.message || err.error;
    if (failureType) {
      yield put({
        type: failureType,
        message: errorMessage,
      });
    }
    if (failureCb) failureCb(errorMessage);
    if (showAlert && errorMessage) Utils.showMessage(errorMessage);
  }
}

export default function* root() {
  yield takeEvery(GENERAL_REQUEST, watchGeneralRequest);
}
