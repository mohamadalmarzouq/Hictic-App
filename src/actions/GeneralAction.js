import {GENERAL_REQUEST} from './ActionTypes';

export function generalAction(
  url,
  payload,
  successType,
  failureType,
  successCb = undefined,
  failureCb = undefined,
  returnCompleteResponse = false,
  isGetRequest = false,
  showAlert = true,
) {
  return {
    url,
    payload,
    successType,
    failureType,
    successCb,
    failureCb,
    returnCompleteResponse,
    isGetRequest,
    showAlert,
    type: GENERAL_REQUEST,
  };
}

export function generalSaveAction(type, data, page) {
  return {
    type,
    data,
    page,
  };
}

export function generalDispatchType(type) {
  return {
    type,
  };
}
