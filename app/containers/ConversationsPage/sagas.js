import { takeLatest, takeEvery } from 'redux-saga';
import { call, put, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import _ from 'underscore';
import moment from 'moment';
import {
  GET_CONVERSATIONS,
  GET_STORE,
  GET_CONVERSATIONS_URI,
  GET_STORE_URI,
  SET_VIEW,
} from './constants';
import {
  getConversationsSuccess,
  getStoreSuccess,
  getStore,
  setOutstandingOrders,
  getOrdersSuccess,
} from './actions';
import request from 'utils/request';

function* getConversations() {
  const conversations = yield call(request, GET_CONVERSATIONS_URI, {
    method: 'GET',
    credentials: 'include',
  });
  const convArr = _.map(conversations, (val, key) => ({ Data: val, StoreId: key }));
  for (let i = 0; i < convArr.length; i += 1) {
    if (convArr[i].Data.ConversationTop) {
      convArr[i].Data.ConversationTop.sort((a, b) => b.Timestamp - a.Timestamp);
    }
  }
  convArr.sort((a, b) => {
    if (a.Data.ConversationTop && b.Data.ConversationTop) {
      return b.Data.ConversationTop[0].Timestamp - a.Data.ConversationTop[0].Timestamp;
    } else if (a.Data.ConversationTop) {
      return -1;
    } else if (b.Data.ConversationTop) {
      return 1;
    }
    return 0;
  });
  yield put(getConversationsSuccess(convArr));
  let outstandingOrders = 0;
  for (let i = 0; i < convArr.length; i += 1) {
    outstandingOrders += convArr[i].Data.UnfulfilledOrderIds ? convArr[i].Data.UnfulfilledOrderIds.length : 0;
    yield put(getStore(convArr[i].StoreId));
  }
  yield put(setOutstandingOrders(outstandingOrders));
}

function* getStoreSaga(action) {
  const store = yield call(request, `${GET_STORE_URI}?storeId=${action.storeId}`, {
    method: 'GET',
    credentials: 'include',
  });
  yield put(getStoreSuccess(store));
}

function* getOrders() {
  const orders = yield call(request, 'https://api.teamruah.com/v1/order/GetReceivedOrders', {
    method: 'GET',
    credentials: 'include',
  });
  for (let i = 0; i < orders.Orders.length; i += 1) {
    orders.Orders[i].OrderCreatedDate = moment(orders.Orders[i].OrderCreatedDate);
  }
  orders.Orders.sort((a, b) => b.OrderCreatedDate - a.OrderCreatedDate);
  yield put(getOrdersSuccess(orders.Orders));
}

function* watchGetConversations() {
  const watcher = yield takeLatest(GET_CONVERSATIONS, getConversations);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

function* watchGetStore() {
  const watcher = yield takeEvery(GET_STORE, getStoreSaga);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

function* watchSetView() {
  const watcher = yield takeLatest(SET_VIEW, getOrders);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  watchGetConversations,
  watchGetStore,
  watchSetView,
];
