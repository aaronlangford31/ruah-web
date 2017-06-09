import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import {
  GET_STORES,
  GET_STORES_URI,
  SUBMIT_CHANNEL_REQUEST,
  PUT_CHANNEL_REQUEST_URI,
} from './constants';
import {
  getStoresSucess,
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
    yield put(getStoresSucess(result.items));
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

export function* onGetStores() {
  yield* takeLatest(GET_STORES, getStores);
}

export function* onSubmitChannelRequest() {
  yield* takeLatest(SUBMIT_CHANNEL_REQUEST, putChannelRequest);
}

export default [
  onGetStores,
  onSubmitChannelRequest,
];
