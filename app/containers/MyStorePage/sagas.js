import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import {
  SAVE_EDIT_STORE,
  PUT_STORE_URI,
} from './constants';
import {
  saveStoreEditsFail,
} from './actions';
import { selectStore } from '../App/selectors';
import request from 'utils/request';

export function* putStore() {
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

export function* onSaveEditStore() {
  yield* takeLatest(SAVE_EDIT_STORE, putStore);
}

export default [
  onSaveEditStore,
];
