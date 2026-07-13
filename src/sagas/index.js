import {fork} from 'redux-saga/effects';
import general from './general';
import settings from './settings';
import generalListing from './generalListing';
import generalListingSearch from './generalListingSearch';

export default function* root() {
  yield fork(general);
  yield fork(settings);
  yield fork(generalListing);
  yield fork(generalListingSearch);
}
