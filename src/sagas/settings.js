import {put, call, takeLatest} from 'redux-saga/effects';
import {UPDATE_SETTINGS, UPDATE_CHUNK_USER} from '../actions/ActionTypes';
import {generalSaveAction} from '../actions/GeneralAction';
import ApiSauce from '../services/ApiSauce';
import {API_USER_UPDATE} from '../config/WebService';

function callRequest(payload) {
  return ApiSauce.post(API_USER_UPDATE, payload);
}

function* watchRequest(action) {
  const {payload, successCb, failureCb} = action;
  try {
    const response = yield call(callRequest, payload);
    yield put(generalSaveAction(UPDATE_CHUNK_USER, payload));
    if (successCb) successCb();
  } catch (err) {
    if (failureCb) failureCb();
  }
}

export default function* root() {
  yield takeLatest(UPDATE_SETTINGS.REQUEST, watchRequest);
}
