import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  GET_ORDERS,
  UPDATE_ORDER_TO_PROCESSING,
  UPDATE_ORDER_TO_SHIPPING,
} from './constants';
import {
  getOrdersSuccess,
  getOrdersError,
  updateOrderToProcessingSuccess,
  updateOrderToProcessingError,
  updateOrderToShippingSuccess,
  updateOrderToShippingError,
} from './actions';
import request from 'utils/request';

export function* getOrders() {
  const requestURL = 'http://api.teamruah.com/v1/order/GetUnfulfilledOrders';

  try {
    // Call our request helper (see 'utils/request')
    const orders = yield call(request, requestURL, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    yield put(getOrdersSuccess(orders));
  } catch (err) {
    yield put(getOrdersError(`Error: ${err.message}`));
  }
}

export function* updateOrderToProcessing() {
  const requestURL = 'http://api.teamruah.com/v1/order/updateToProcessing?orderId=<string>';

  try {
    // Call our request helper (see 'utils/request')
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

export function* updateOrderToShipping() {
  const requestURL = 'http://api.teamruah.com/v1/order/updateToShipped?orderId=<string>';

  try {
    // Call our request helper (see 'utils/request')
    yield call(request, requestURL, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    yield put(updateOrderToShippingSuccess());
  } catch (err) {
    yield put(updateOrderToShippingError(`Error: ${err.message}`));
  }
}

export function* getOrdersData() {
  yield* takeLatest(GET_ORDERS, getOrders);
}

export function* getUpdateOrderToProcessingData() {
  yield* takeLatest(UPDATE_ORDER_TO_PROCESSING, updateOrderToProcessing);
}

export function* getUpdateOrderToShippingData() {
  yield* takeLatest(UPDATE_ORDER_TO_SHIPPING, updateOrderToShipping);
}

export default [
  getOrdersData,
  getUpdateOrderToProcessingData,
  getUpdateOrderToShippingData,
];
