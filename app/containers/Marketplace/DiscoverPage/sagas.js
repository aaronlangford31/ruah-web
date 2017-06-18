import { takeLatest } from 'redux-saga';
import { call, cancel, put, take, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  GET_STORES,
  GET_STORES_URI,
  SUBMIT_CHANNEL_REQUEST,
  PUT_CHANNEL_REQUEST_URI,
} from './constants';
import {
  getStoresSuccess,
  getStoresFail,
  submitChannelRequestSuccess,
} from './actions';
import { selectChannelRequest } from './selectors';
import request from 'utils/request';

export function* getStores() {
  try {
    const result = yield call(request, GET_STORES_URI, {
      method: 'GET',
      credentials: 'include',
    });
    yield put(getStoresSuccess(result.items));
  } catch (err) {
    yield put(getStoresFail());
  }
}

export function* putChannelRequest() {
  const channelRequest = yield select(selectChannelRequest());
  yield call(request, PUT_CHANNEL_REQUEST_URI, {
    method: 'POST',
    body: JSON.stringify(channelRequest),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  yield put(submitChannelRequestSuccess());
}

export function* watchGetStores() {
  const watcher = yield takeLatest(GET_STORES, getStores);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchSubmitChannelRequest() {
  const watcher = yield takeLatest(SUBMIT_CHANNEL_REQUEST, putChannelRequest);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  watchGetStores,
  watchSubmitChannelRequest,
];
