import { takeLatest } from 'redux-saga';
import { call, put, take, cancel, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  GET_STORE,
  SAVE_EDIT_STORE,
  PUT_STORE_URI,
  GET_STORE_URI,
} from './constants';
import {
  saveStoreEditsFail,
  getStoreSuccess,
} from './actions';
import { selectStore } from '../App/selectors';
import request from 'utils/request';

function* putStore() {
  const store = yield select(selectStore());
  try {
    yield call(request, PUT_STORE_URI, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(store),
      credentials: 'include',
    });
  } catch (err) {
    yield put(saveStoreEditsFail());
  }
}

function* getStore() {
  const store = yield call(request, GET_STORE_URI, {
    method: 'GET',
    credentials: 'include',
  });
  yield put(getStoreSuccess(store));
}

function* watchSaveEditStore() {
  const watcher = yield takeLatest(SAVE_EDIT_STORE, putStore);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

function* watchGetStore() {
  const watcher = yield takeLatest(GET_STORE, getStore);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  watchSaveEditStore,
  watchGetStore,
];
