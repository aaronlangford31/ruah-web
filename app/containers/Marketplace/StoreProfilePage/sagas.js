import { takeLatest } from 'redux-saga';
import { call, put, select, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  GET_STORE_BY_ID,
  GET_STORE_PRODUCT_BY_ID,
  URI_GET_STORE_BY_ID,
  URI_GET_STORE_PRODUCT,
} from './constants';
import {
  getStoreByIdSuccess,
  getStoreByIdNotFound,
  getStoreByIdError,
  getStoreProductByIdSuccess,
} from './actions';
import { selectCurrentStoreId } from './selectors';
import request from 'utils/request';

function* getStoreById() {
  const currentStoreId = yield select(selectCurrentStoreId());
  try {
    const store = yield call(request,
      `${URI_GET_STORE_BY_ID}?storeId=${currentStoreId}`, {
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

function* getStoreProduct() {
  const currentStoreId = yield select(selectCurrentStoreId());
  const product = yield call(request,
    `${URI_GET_STORE_PRODUCT}?storeId=${currentStoreId}`, {
      credentials: 'include',
    },
  );
  yield put(getStoreProductByIdSuccess(product));
}

export function* watchGetStore() {
  const watcher = yield takeLatest(GET_STORE_BY_ID, getStoreById);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchGetStoreProducts() {
  const watcher = yield takeLatest(GET_STORE_PRODUCT_BY_ID, getStoreProduct);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  watchGetStore,
  watchGetStoreProducts,
];
