import { takeLatest } from 'redux-saga';
import { call, put, select, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import _ from 'underscore';
import {
  LOAD_ORDER_PROFILE_DATA,
  UPDATE_ORDER_TO_PROCESSING,
  UPDATE_ORDER_TO_SHIPPING,
} from './constants';
import {
  loadOrderProfileDataSuccess,
  loadOrderProfileDataError,
  updateOrderToProcessingSuccess,
  updateOrderToProcessingError,
  onUpdateOrderToShippingSuccess,
  onUpdateOrderToShippingError,
} from './actions';
import { selectOrders } from '../OrdersPage/selectors';
import {
  selectCurrentOrderId,
  selectFulfillmentFormData,
} from './selectors';
import request from 'utils/request';

export function* getOrderById() {
  const existingOrders = yield select(selectOrders());
  const currentOrderId = yield select(selectCurrentOrderId());
  const localOrder = _.findWhere(existingOrders, { OrderId: currentOrderId });
  if (localOrder !== undefined) {
    yield put(loadOrderProfileDataSuccess(localOrder));
  } else {
    const requestURL = `https://api.teamruah.com/v1/order/getOrderById?orderId=${currentOrderId}`;
    try {
      // Call our request helper (see 'utils/request')
      const order = yield call(request, requestURL, {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      yield put(loadOrderProfileDataSuccess(order));
    } catch (err) {
      yield put(loadOrderProfileDataError(`Error: ${err.message}`));
    }
  }
}

export function* postUpdateOrderToProcessing() {
  const currentOrderId = yield select(selectCurrentOrderId());
  const requestURL = `https://api.teamruah.com/v1/order/updateToProcessing?orderId=${currentOrderId}`;

  try {
    yield call(request, requestURL, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    yield put(updateOrderToProcessingSuccess());
  } catch (err) {
    yield put(updateOrderToProcessingError());
  }
}

export function* postUpdateOrderToShipping() {
  const currentOrderId = yield select(selectCurrentOrderId());
  const fulfillmentInfo = yield select(selectFulfillmentFormData());
  const requestURL = `https://api.teamruah.com/v1/order/updateToShipped?orderId=${currentOrderId}`;

  try {
    yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(fulfillmentInfo),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    yield put(onUpdateOrderToShippingSuccess(currentOrderId));
  } catch (err) {
    yield put(onUpdateOrderToShippingError());
  }
}

export function* loadOrderProfileData() {
  const watcher = yield takeLatest(LOAD_ORDER_PROFILE_DATA, getOrderById);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* updateOrderToProcessing() {
  const watcher = yield takeLatest(UPDATE_ORDER_TO_PROCESSING, postUpdateOrderToProcessing);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* updateOrderToShipped() {
  const watcher = yield takeLatest(UPDATE_ORDER_TO_SHIPPING, postUpdateOrderToShipping);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  loadOrderProfileData,
  updateOrderToProcessing,
  updateOrderToShipped,
];
