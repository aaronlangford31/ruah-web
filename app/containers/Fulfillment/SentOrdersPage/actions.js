import {
  GET_SENT_ORDERS,
  GET_SENT_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
} from './constants';

export function getOrders() {
  return {
    type: GET_SENT_ORDERS,
  };
}

export function getOrdersSuccess(orders, pageKey) {
  return {
    type: GET_SENT_ORDERS_SUCCESS,
    orders,
    pageKey,
  };
}

export function getOrdersError() {
  return {
    type: GET_ORDERS_ERROR,
  };
}
