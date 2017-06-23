import { takeLatest } from 'redux-saga';
import { call, put, take, cancel, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  GET_RECEIVED_ORDERS,
  UPDATE_ORDER_TO_PROCESSING,
  UPDATE_ORDER_TO_SHIPPING,
  GET_RECEIVED_ORDERS_URI,
} from './constants';
import {
  getOrdersSuccess,
  getOrdersError,
  updateOrderToProcessingSuccess,
  updateOrderToProcessingError,
  updateOrderToShippingSuccess,
  updateOrderToShippingError,
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
      const response = yield call(request, `${GET_RECEIVED_ORDERS_URI}?pageKey=${pageKey}`, {
        credentials: 'include',
      });

      yield put(getOrdersSuccess(response.Orders, response.PageKey));
    } else {
      const response = yield call(request, GET_RECEIVED_ORDERS_URI, {
        credentials: 'include',
      });

      yield put(getOrdersSuccess(response.Orders, response.PageKey));
    }
  } catch (err) {
    yield put(getOrdersError(`Error: ${err.message}`));
  }
}

export function* updateOrderToProcessing({ orderId }) {
  const requestURL = `https://api.teamruah.com/v1/order/updateToProcessing?orderId=${orderId}`;

  try {
    yield call(request, requestURL, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    yield put(updateOrderToProcessingSuccess());
  } catch (err) {
    yield put(updateOrderToProcessingError(`Error: ${err.message}`));
  }
}

export function* updateOrderToShipping({ orderId, values }) {
  const requestURL = `https://api.teamruah.com/v1/order/updateToShipped?orderId=${orderId}`;

  if (values.size !== 0) {
    try {
      yield call(request, requestURL, {
        method: 'POST',
        body: JSON.stringify(values.toJS()),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      yield put(updateOrderToShippingSuccess(orderId));
    } catch (err) {
      yield put(updateOrderToShippingError(`Error: ${err.message}`));
    }
  }
}

export function* getOrdersData() {
  const watcher = yield takeLatest(GET_RECEIVED_ORDERS, getOrders);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getUpdateOrderToProcessingData() {
  const watcher = yield takeLatest(UPDATE_ORDER_TO_PROCESSING, updateOrderToProcessing);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getUpdateOrderToShippingData() {
  const watcher = yield takeLatest(UPDATE_ORDER_TO_SHIPPING, updateOrderToShipping);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  getOrdersData,
  getUpdateOrderToProcessingData,
  getUpdateOrderToShippingData,
];
