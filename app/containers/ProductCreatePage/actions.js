import {
  CREATE_PRODUCT_REQUEST,
  SUBMIT_CREATE_PRODUCT_SUCCESS,
  SUBMIT_CREATE_PRODUCT_ERROR,
  INVALID_SKU,
  INVALID_SKU_REMOVE,
  ERROR_REMOVE,
} from './constants';

export function createProduct(values) {
  return {
    type: CREATE_PRODUCT_REQUEST,
    values,
  };
}

export function submitCreateProductSuccess() {
  return {
    type: SUBMIT_CREATE_PRODUCT_SUCCESS,
  };
}

export function submitCreateProductError(error) {
  return {
    type: SUBMIT_CREATE_PRODUCT_ERROR,
    error,
  };
}

export function invalidSkuDetected() {
  return {
    type: INVALID_SKU,
  };
}

export function removeInvalidSku() {
  return {
    type: INVALID_SKU_REMOVE,
  };
}

export function removeError() {
  return {
    type: ERROR_REMOVE,
  };
}
