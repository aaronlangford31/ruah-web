import { takeLatest } from 'redux-saga';
import { call, put, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  GET_FEED,
  GET_FEED_URI,
  SUBMIT_FEED_POST_REACTION,
  FEED_POST_REACT_URI,
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

function* sendReactPost(action) {
  yield call(request, `${FEED_POST_REACT_URI}?timestamp=${action.postTimestamp}&reaction=${action.reaction}&author=${action.postAuthor}`, {
    method: 'GET',
    credentials: 'include',
  });
}

function* watchGetFeed() {
  const watcher = yield takeLatest(GET_FEED, getFeed);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

function* watchReactPost() {
  const watcher = yield takeLatest(SUBMIT_FEED_POST_REACTION, sendReactPost);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  watchGetFeed,
  watchReactPost,
];
