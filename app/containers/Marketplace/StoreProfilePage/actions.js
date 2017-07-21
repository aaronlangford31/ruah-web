import {
  GET_STORE_BY_ID,
  GET_STORE_BY_ID_SUCCESS,
  GET_STORE_BY_ID_NOT_FOUND,
  GET_STORE_BY_ID_ERROR,
  GET_STORE_PRODUCT_BY_ID,
  GET_STORE_PRODUCT_BY_ID_SUCCESS,
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
