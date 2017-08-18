import { takeLatest } from 'redux-saga';
import { call, put, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  GET_FEED,
  GET_FEED_URI,
} from './constants';
import {
  getFeedSuccess,
} from './actions';
import request from 'utils/request';

function* getFeed() {
  const posts = yield call(request, GET_FEED_URI, {
    method: 'GET',
    credentials: 'include',
  });
  posts.sort((a, b) => b.Timestamp - a.Timestamp);
  yield put(getFeedSuccess(posts));
}

function* watchGetFeed() {
  const watcher = yield takeLatest(GET_FEED, getFeed);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  watchGetFeed,
];
