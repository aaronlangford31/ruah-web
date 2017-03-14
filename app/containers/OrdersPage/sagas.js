import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  GET_ORDERS_REQUEST,
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

export function* updateOrderToProcessing({ orderId }) {
  const requestURL = `http://api.teamruah.com/v1/order/updateToProcessing?orderId=${orderId}`;

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
  const requestURL = `http://api.teamruah.com/v1/order/updateToShipped?orderId=${orderId}`;

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
  yield takeLatest(GET_ORDERS_REQUEST, getOrders);
}

export function* getUpdateOrderToProcessingData() {
  yield takeLatest(UPDATE_ORDER_TO_PROCESSING, updateOrderToProcessing);
}

export function* getUpdateOrderToShippingData() {
  yield takeLatest(UPDATE_ORDER_TO_SHIPPING, updateOrderToShipping);
}

export default [
  getOrdersData,
  getUpdateOrderToProcessingData,
  getUpdateOrderToShippingData,
];

