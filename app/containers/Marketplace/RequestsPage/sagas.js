import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
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

export function* onGetRequests() {
  yield* takeLatest(GET_REQUESTS, getRequests);
}

export function* onChannelApprove() {
  yield* takeLatest(SUBMIT_CHANNEL_APPROVAL, putChannelApproval);
}

export function* onChannelDecline() {
  yield* takeLatest(SUBMIT_CHANNEL_DECLINE, putChannelDecline);
}

export default [
  onGetRequests,
  onChannelApprove,
  onChannelDecline,
];
