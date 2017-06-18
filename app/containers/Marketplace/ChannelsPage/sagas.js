import { takeLatest } from 'redux-saga';
import { call, cancel, put, take } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  GET_STORE,
  GET_STORE_URI,
} from './constants';
import {
  getStoreSuccess,
  getStoreFail,
} from './actions';
import request from 'utils/request';

export function* getStore() {
  try {
    const result = yield call(request, GET_STORE_URI, {
      method: 'GET',
      credentials: 'include',
    });
    yield put(getStoreSuccess(result));
  } catch (err) {
    yield put(getStoreFail());
  }
}

export function* watchGetStore() {
  const watcher = yield takeLatest(GET_STORE, getStore);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  watchGetStore,
];
