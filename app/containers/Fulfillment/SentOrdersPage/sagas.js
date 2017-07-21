import { takeLatest } from 'redux-saga';
import { call, put, take, cancel, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  GET_SENT_ORDERS,
  GET_SENT_ORDERS_URI,
} from './constants';
import {
  getOrdersSuccess,
  getOrdersError,
} from './actions';
import {
  selectPageKey,
  selectOrders,
} from './selectors';
import request from 'utils/request';

export function* getOrders() {
  const pageKey = yield select(selectPageKey());
  const localOrders = yield select(selectOrders());
  if (!pageKey && localOrders.length) {
    yield put(getOrdersSuccess([], ''));
    return;
  }
  try {
    if (pageKey) {
      const response = yield call(request, `${GET_SENT_ORDERS_URI}?pageKey=${pageKey}`, {
        credentials: 'include',
      });

      yield put(getOrdersSuccess(response.Orders, response.PageKey));
    } else {
      const response = yield call(request, GET_SENT_ORDERS_URI, {
        credentials: 'include',
      });

      yield put(getOrdersSuccess(response.Orders, response.PageKey));
    }
  } catch (err) {
    yield put(getOrdersError(`Error: ${err.message}`));
  }
}

export function* getOrdersData() {
  const watcher = yield takeLatest(GET_SENT_ORDERS, getOrders);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  getOrdersData,
];
