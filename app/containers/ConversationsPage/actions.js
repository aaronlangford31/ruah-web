import {
  GET_CONVERSATIONS,
  GET_CONVERSATIONS_SUCCESS,
  GET_STORE,
  GET_STORE_SUCCESS,
  SET_OUTSTANDING_ORDERS,
  SET_VIEW,
  GET_ORDERS_SUCCESS,
} from './constants';

export function getConversations() {
  return {
    type: GET_CONVERSATIONS,
  };
}

export function getConversationsSuccess(conversations) {
  return {
    type: GET_CONVERSATIONS_SUCCESS,
    conversations,
  };
}

export function getStore(storeId) {
  return {
    type: GET_STORE,
    storeId,
  };
}

export function getStoreSuccess(store) {
  return {
    type: GET_STORE_SUCCESS,
    store,
  };
}

export function setOutstandingOrders(num) {
  return {
    type: SET_OUTSTANDING_ORDERS,
    num,
  };
}

export function setView(view) {
  return {
    type: SET_VIEW,
    view,
  };
}

export function getOrdersSuccess(orders) {
  return {
    type: GET_ORDERS_SUCCESS,
    orders,
  };
}
