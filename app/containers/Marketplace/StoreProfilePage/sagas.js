import { takeLatest } from 'redux-saga';
import { call, put, select, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  GET_STORE_BY_ID,
  URI_GET_STORE_BY_ID,
} from './constants';
import {
  getStoreByIdSuccess,
  getStoreByIdNotFound,
  getStoreByIdError,
} from './actions';
import { selectCurrentStoreId } from './selectors';
import request from 'utils/request';

function* getStoreById() {
  const currentStoreId = yield select(selectCurrentStoreId());
  try {
    const store = yield call(request,
      `${URI_GET_STORE_BY_ID}?id=${currentStoreId}`, {
        credentials: 'include',
      },
    );
    yield put(getStoreByIdSuccess(store));
  } catch (err) {
    if (err.status === 404) {
      yield put(getStoreByIdNotFound());
    } else {
      yield put(getStoreByIdError());
    }
  }
}

export function* watchGetStore() {
  const watcher = yield takeLatest(GET_STORE_BY_ID, getStoreById);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  watchGetStore,
];
