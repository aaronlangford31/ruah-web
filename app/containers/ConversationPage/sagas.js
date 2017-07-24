import { takeLatest, takeEvery } from 'redux-saga';
import { call, put, take, cancel, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import _ from 'underscore';
import {
  GET_CONVERSATION,
  GET_STORE,
  GET_CONVERSATION_URI,
  GET_STORE_URI,
  SEND_MESSAGE,
  POST_MESSAGE_URI,
  GET_PRODUCT,
  SEARCH_PRODUCT_URI,
  GET_PRODUCT_BY_ID_URI,
  POST_ORDER_URI,
} from './constants';
import {
  getStore,
  getConversationSuccess,
  getStoreSuccess,
  sendMessageSuccess,
  getProductSuccess,
} from './actions';
import { selectMessage, selectConversation, selectOrder, selectShippingFormData } from './selectors';
import { selectStore } from '../App/selectors';
import request from 'utils/request';

function* getConversation(action) {
  const conversation = yield call(request, `${GET_CONVERSATION_URI}?channelId=${action.channelId}`, {
    method: 'GET',
    credentials: 'include',
  });
  const storeLookup = {};
  conversation.sort((a, b) => a.Timestamp - b.Timestamp);
  for (let i = 0; i < conversation.length; i += 1) {
    if (!storeLookup[conversation[i].Author]) {
      yield put(getStore(conversation[i].Author));
      storeLookup[conversation[i].Author] = true;
    }
    if (!storeLookup[conversation[i].Recipient]) {
      yield put(getStore(conversation[i].Recipient));
      storeLookup[conversation[i].Recipient] = true;
    }
  }
  yield put(getConversationSuccess(conversation));
}

function* getStoreSaga(action) {
  const store = yield call(request, `${GET_STORE_URI}?storeId=${action.storeId}`, {
    method: 'GET',
    credentials: 'include',
  });

  yield put(getStoreSuccess(store));
}

function* postMessage() {
  const message = yield select(selectMessage());
  if (message.Attachments && message.Attachments.length > 0) {
    const data = new FormData();
    for (let i = 0; i < message.Attachments.length; i += 1) {
      data.append('file', message.Attachments[i].Data.File);
    }
    const resourceUris = yield call(request, `https://api.teamruah.com/v1/media/file?channelId=${message.ChannelId}`, {
      method: 'POST',
      credentials: 'include',
      body: data,
    });
    for (let i = 0; i < message.Attachments.length; i += 1) {
      message.Attachments[i].ResourceUri = resourceUris.locations[i];
      delete message.Attachments[i].Data.File;
    }
  }

  const orderItems = yield select(selectOrder());
  if (orderItems.OrderItems) {
    const order = yield select(selectShippingFormData());
    order.OrderItems = _.map(orderItems.OrderItems, (val) => val);

    yield call(request, POST_ORDER_URI, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
  }

  const conversation = yield select(selectConversation());
  conversation[conversation.length - 1] = message;
  yield put(getConversationSuccess(conversation));
  yield call(request, POST_MESSAGE_URI, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
  yield put(sendMessageSuccess());
}

function* fetchProduct(action) {
  if (action.query) {
    const result = yield call(request, `${SEARCH_PRODUCT_URI}?query=${action.query}&storeId=${action.storeId}`, {
      method: 'GET',
      credentials: 'include',
    });
    result.sort((a, b) => b.Score - a.Score);
    yield put(getProductSuccess(_.map(result, (item) => item.Item)));
  } else {
    const products = [];
    const store = yield select(selectStore());
    const recentProducts = store.MsgChannels[action.storeId].RecentProducts;
    if (recentProducts) {
      for (let i = 0; i < recentProducts.length; i += 1) {
        const product = yield call(request, `${GET_PRODUCT_BY_ID_URI}?id=${recentProducts[i]}`, {
          method: 'GET',
          credentials: 'include',
        });
        products.push(product);
      }
    }
    yield put(getProductSuccess(products));
  }
}

function* watchGetConversations() {
  const watcher = yield takeLatest(GET_CONVERSATION, getConversation);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

function* watchGetStore() {
  const watcher = yield takeEvery(GET_STORE, getStoreSaga);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

function* watchSendMessage() {
  const watcher = yield takeLatest(SEND_MESSAGE, postMessage);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

function* watchGetProduct() {
  const watcher = yield takeLatest(GET_PRODUCT, fetchProduct);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  watchGetConversations,
  watchGetStore,
  watchSendMessage,
  watchGetProduct,
];
