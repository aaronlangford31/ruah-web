import {
  GET_STORE_BY_ID,
  GET_STORE_BY_ID_SUCCESS,
  GET_STORE_BY_ID_NOT_FOUND,
  GET_STORE_BY_ID_ERROR,
  GET_STORE_PRODUCT_BY_ID,
  GET_STORE_PRODUCT_BY_ID_SUCCESS,
  OPEN_CHANNEL_REQUEST_MODAL,
  CANCEL_CHANNEL_REQUEST_MODAL,
  SUBMIT_CHANNEL_REQUEST,
  SUBMIT_CHANNEL_REQUEST_SUCCESS,
  CHANGE_CHANNEL_REQUEST,
} from './constants';

export function getStoreById(StoreId) {
  return {
    type: GET_STORE_BY_ID,
    StoreId,
  };
}

export function getStoreByIdSuccess(store) {
  return {
    type: GET_STORE_BY_ID_SUCCESS,
    store,
  };
}

export function getStoreByIdNotFound() {
  return {
    type: GET_STORE_BY_ID_NOT_FOUND,
  };
}

export function getStoreByIdError() {
  return {
    type: GET_STORE_BY_ID_ERROR,
  };
}

export function getStoreProductById(StoreId) {
  return {
    type: GET_STORE_PRODUCT_BY_ID,
    StoreId,
  };
}

export function getStoreProductByIdSuccess(products) {
  return {
    type: GET_STORE_PRODUCT_BY_ID_SUCCESS,
    products,
  };
}

export function openChannelRequestModal(storeId) {
  return {
    type: OPEN_CHANNEL_REQUEST_MODAL,
    storeId,
  };
}

export function cancelChannelRequestModal() {
  return {
    type: CANCEL_CHANNEL_REQUEST_MODAL,
  };
}

export function submitChannelRequest() {
  return {
    type: SUBMIT_CHANNEL_REQUEST,
  };
}

export function submitChannelRequestSuccess() {
  return {
    type: SUBMIT_CHANNEL_REQUEST_SUCCESS,
  };
}

export function changeChannelRequest(newVal, field) {
  return {
    type: CHANGE_CHANNEL_REQUEST,
    newVal,
    field,
  };
}
