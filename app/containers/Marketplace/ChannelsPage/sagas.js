import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
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

export function* onGetStore() {
  yield* takeLatest(GET_STORE, getStore);
}

export default [
  onGetStore,
];
