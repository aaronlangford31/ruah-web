import { takeLatest } from 'redux-saga';
import { call, cancel, put, select, take } from 'redux-saga/effects';
import request from 'utils/request';
import _ from 'underscore';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  SUBMIT_ORDER,
  POST_ORDER_URI,
} from './constants';
import {
  submitOrderSuccess,
} from './actions';
import {
  selectOrder,
  selectCartItems,
} from './selectors';

function* postOrder() {
  const order = yield select(selectOrder());
  const items = yield select(selectCartItems());

  order.OrderItems = _.map(items, (item) => ({
    Quantity: item.Quantity,
    RuahId: item.RuahId,
    RetailPrice: item.WholesalePrice,
    ShippingPrice: item.ShippingPrice,
  }));

  yield call(request, POST_ORDER_URI, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(order),
  });
  yield put(submitOrderSuccess());
}

function* watchSubmitOrder() {
  const watcher = yield takeLatest(SUBMIT_ORDER, postOrder);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  watchSubmitOrder,
];
