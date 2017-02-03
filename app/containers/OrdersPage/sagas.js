import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { GET_ORDERS } from './constants';
import { getOrdersSuccess, getOrdersError } from './actions';
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

export function* getOrdersData() {
  yield* takeLatest(GET_ORDERS, getOrders);
}

export default [
  getOrdersData,
];
