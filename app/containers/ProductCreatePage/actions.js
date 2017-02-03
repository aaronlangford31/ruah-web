/*
 * Sign Up Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  SUBMIT_CREATE_PRODUCT,
  SUBMIT_CREATE_PRODUCT_SUCCESS,
  SUBMIT_CREATE_PRODUCT_ERROR,
  INVALID_SKU,
  INVALID_SKU_REMOVE,
  ERROR_REMOVE,
} from './constants';

export function submitCreateProduct() {
  return {
    type: SUBMIT_CREATE_PRODUCT,
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
