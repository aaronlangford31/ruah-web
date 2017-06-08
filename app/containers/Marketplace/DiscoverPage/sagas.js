import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  GET_STORES,
  GET_STORES_URI,
} from './constants';
import {
  getStoresSucess,
  getStoresFail,
} from './actions';
import request from 'utils/request';

export function* getStores() {
  try {
    const result = yield call(request, GET_STORES_URI, {
      method: 'GET',
      credentials: 'include',
    });
    yield put(getStoresSucess(result.items));
  } catch (err) {
    yield put(getStoresFail());
  }
}

export function* onGetStores() {
  yield* takeLatest(GET_STORES, getStores);
}

export default [
  onGetStores,
];
