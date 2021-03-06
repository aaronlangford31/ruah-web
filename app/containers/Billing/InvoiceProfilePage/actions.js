import {
  LOAD_ORDER_PROFILE_DATA,
  LOAD_ORDER_PROFILE_DATA_SUCCESS,
  LOAD_ORDER_PROFILE_DATA_ERROR,
  UPDATE_ORDER_TO_PROCESSING,
  UPDATE_ORDER_TO_PROCESSING_SUCCESS,
  UPDATE_ORDER_TO_PROCESSING_ERROR,
  OPEN_FULFILMENT_DIALOG,
  CLOSE_FULFILMENT_DIALOG,
  UPDATE_ORDER_TO_SHIPPING,
  UPDATE_ORDER_TO_SHIPPING_SUCCESS,
  UPDATE_ORDER_TO_SHIPPING_ERROR,
} from './constants';

export function loadOrderProfileData(orderId) {
  return {
    type: LOAD_ORDER_PROFILE_DATA,
    orderId,
  };
}

export function loadOrderProfileDataSuccess(order) {
  return {
    type: LOAD_ORDER_PROFILE_DATA_SUCCESS,
    order,
  };
}

export function loadOrderProfileDataError() {
  return {
    type: LOAD_ORDER_PROFILE_DATA_ERROR,
  };
}

export function updateOrderToProcessing() {
  return {
    type: UPDATE_ORDER_TO_PROCESSING,
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

export function openFulfilmentDialog() {
  return {
    type: OPEN_FULFILMENT_DIALOG,
  };
}

export function closeFulfilmentDialog() {
  return {
    type: CLOSE_FULFILMENT_DIALOG,
  };
}

export function updateOrderToShipping(orderId) {
  return {
    type: UPDATE_ORDER_TO_SHIPPING,
    orderId,
  };
}

export function onUpdateOrderToShippingSuccess(orderId) {
  return {
    type: UPDATE_ORDER_TO_SHIPPING_SUCCESS,
    orderId,
  };
}

export function onUpdateOrderToShippingError() {
  return {
    type: UPDATE_ORDER_TO_SHIPPING_ERROR,
  };
}
