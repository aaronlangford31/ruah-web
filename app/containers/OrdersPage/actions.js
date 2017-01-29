import {
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
  REMOVE_ERROR,
} from './constants';

export function getProducts() {
  return {
    type: GET_ORDERS,
  };
}

export function getOrdersSuccess(orders) {
  return {
    type: GET_ORDERS_SUCCESS,
    orders,
  };
}

export function getOrdersError() {
  return {
    type: GET_ORDERS_ERROR,
  };
}

export function removeError() {
  return {
    type: REMOVE_ERROR,
  };
}
