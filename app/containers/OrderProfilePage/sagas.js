import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
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
    const requestURL = `http://api.teamruah.com/v1/order/getOrderById?orderId=${currentOrderId}`;
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
  const requestURL = `http://api.teamruah.com/v1/order/updateToProcessing?orderId=${currentOrderId}`;

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
  const requestURL = `http://api.teamruah.com/v1/order/updateToShipped?orderId=${currentOrderId}`;

  try {
    yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(fulfillmentInfo),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
  } catch (err) {
    yield put();
  }
}

export function* loadOrderProfileData() {
  yield takeLatest(LOAD_ORDER_PROFILE_DATA, getOrderById);
}

export function* updateOrderToProcessing() {
  yield takeLatest(UPDATE_ORDER_TO_PROCESSING, postUpdateOrderToProcessing);
}

export function* updateOrderToShipped() {
  yield takeLatest(UPDATE_ORDER_TO_SHIPPING, postUpdateOrderToShipping);
}

export default [
  loadOrderProfileData,
  updateOrderToProcessing,
  updateOrderToShipped,
];
