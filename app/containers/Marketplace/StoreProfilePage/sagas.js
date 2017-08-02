import { takeLatest } from 'redux-saga';
import { call, put, select, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  GET_STORE_BY_ID,
  GET_STORE_PRODUCT_BY_ID,
  URI_GET_STORE_BY_ID,
  URI_GET_STORE_PRODUCT,
  SUBMIT_CHANNEL_REQUEST,
  PUT_CHANNEL_REQUEST_URI,
} from './constants';
import {
  getStoreByIdSuccess,
  getStoreByIdNotFound,
  getStoreByIdError,
  getStoreProductByIdSuccess,
  submitChannelRequestSuccess,
} from './actions';
import { selectCurrentStoreId, selectChannelRequest } from './selectors';
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

function* putChannelRequest() {
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

function* watchGetStore() {
  const watcher = yield takeLatest(GET_STORE_BY_ID, getStoreById);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

function* watchGetStoreProducts() {
  const watcher = yield takeLatest(GET_STORE_PRODUCT_BY_ID, getStoreProduct);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

function* watchSubmitChannelRequest() {
  const watcher = yield takeLatest(SUBMIT_CHANNEL_REQUEST, putChannelRequest);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  watchGetStore,
  watchGetStoreProducts,
  watchSubmitChannelRequest,
];
