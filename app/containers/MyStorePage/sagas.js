import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import {
  GET_STORE,
  SAVE_EDIT_STORE,
  GET_STORE_URI,
  PUT_STORE_URI,
} from './constants';
import {
  getStoreSucess,
  getStoreFail,
  saveStoreEditsFail,
} from './actions';
import { selectStore } from './selectors';
import request from 'utils/request';

export function* getStore() {
  try {
    const store = yield call(request, GET_STORE_URI, {
      method: 'GET',
      credentials: 'include',
    });
    yield put(getStoreSucess(store));
  } catch (err) {
    yield put(getStoreFail());
  }
}

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

export function* submitIntroductionForm() {
  yield* takeLatest(GET_STORE, getStore);
}

export function* onSaveEditStore() {
  yield* takeLatest(SAVE_EDIT_STORE, putStore);
}

export default [
  submitIntroductionForm,
  onSaveEditStore,
];
