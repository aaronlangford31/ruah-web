import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
  UPDATE_ORDER_TO_PROCESSING,
  UPDATE_ORDER_TO_PROCESSING_SUCCESS,
  UPDATE_ORDER_TO_PROCESSING_ERROR,
  UPDATE_ORDER_TO_SHIPPING,
  UPDATE_ORDER_TO_SHIPPING_SUCCESS,
  UPDATE_ORDER_TO_SHIPPING_ERROR,
  REMOVE_ERROR,
} from './constants';

export function getOrders() {
  return {
    type: GET_ORDERS_REQUEST,
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

export function updateOrderToProcessing(orderId) {
  return {
    type: UPDATE_ORDER_TO_PROCESSING,
    orderId,
  };
}

export function updateOrderToProcessingSuccess() {
  return {
    type: UPDATE_ORDER_TO_PROCESSING_SUCCESS,
  };
}

export function updateOrderToProcessingError() {
  return {
    type: UPDATE_ORDER_TO_PROCESSING_ERROR,
  };
}

export function updateOrderToShipping(orderId, values) {
  return {
    type: UPDATE_ORDER_TO_SHIPPING,
    orderId,
    values,
  };
}

export function updateOrderToShippingSuccess(orderId) {
  return {
    type: UPDATE_ORDER_TO_SHIPPING_SUCCESS,
    orderId,
  };
}

export function updateOrderToShippingError() {
  return {
    type: UPDATE_ORDER_TO_SHIPPING_ERROR,
  };
}

export function removeError() {
  return {
    type: REMOVE_ERROR,
  };
}
