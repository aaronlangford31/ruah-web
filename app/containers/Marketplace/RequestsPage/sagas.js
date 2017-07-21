import { takeLatest } from 'redux-saga';
import { call, cancel, put, take } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  GET_REQUESTS,
  GET_REQUESTS_URI,
  SUBMIT_CHANNEL_APPROVAL,
  SUBMIT_CHANNEL_DECLINE,
  PUT_CHANNEL_APPROVAL_URI,
  PUT_CHANNEL_DECLINE_URI,
} from './constants';
import {
  getRequestsSuccess,
  getRequestsFail,
} from './actions';
import request from 'utils/request';

export function* getRequests() {
  try {
    const result = yield call(request, GET_REQUESTS_URI, {
      method: 'GET',
      credentials: 'include',
    });
    yield put(getRequestsSuccess(result));
  } catch (err) {
    yield put(getRequestsFail());
  }
}

export function* putChannelApproval(action) {
  const uri = `${PUT_CHANNEL_APPROVAL_URI}?storeId=${action.request.FromId}&channelType=${action.request.RequestType}`;
  yield call(request, uri, {
    method: 'GET',
    credentials: 'include',
  });
}

export function* putChannelDecline(action) {
  const uri = `${PUT_CHANNEL_DECLINE_URI}?storeId=${action.request.StoreId}&channelType=${action.request.RequestType}`;
  yield call(request, uri, {
    method: 'GET',
    credentials: 'include',
  });
}

export function* watchGetRequests() {
  const watcher = yield takeLatest(GET_REQUESTS, getRequests);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchChannelApprove() {
  const watcher = yield takeLatest(SUBMIT_CHANNEL_APPROVAL, putChannelApproval);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchChannelDecline() {
  const watcher = yield takeLatest(SUBMIT_CHANNEL_DECLINE, putChannelDecline);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  watchGetRequests,
  watchChannelApprove,
  watchChannelDecline,
];
