import {
  GENERAL_REQUEST_LISTING,
  CAMPAIGNS_LISTING_SEARCHED,
  GENERAL_REQUEST_SEARCH_LISTING,
} from './ActionTypes';

export function generalListingRequest(url, payload, requestType, cb) {
  return {
    url,
    payload,
    requestType,
    cb,
    type: GENERAL_REQUEST_LISTING,
  };
}

export function generalListingSuccess(type, data, page) {
  return {
    type,
    data,
    page,
  };
}

export function generalListingFailure(type, errorMessage) {
  return {
    type,
    errorMessage,
  };
}

export function generalListingSearchRequest(url, payload, requestType) {
  return {
    url,
    payload,
    requestType,
    type: GENERAL_REQUEST_SEARCH_LISTING,
  };
}
