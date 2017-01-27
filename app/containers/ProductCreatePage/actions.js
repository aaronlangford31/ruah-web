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
  INVALID_SKU_ERROR,
  REMOVE_ERROR,
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
    type: INVALID_SKU_ERROR,
  };
}

export function removeError() {
  return {
    type: REMOVE_ERROR,
  };
}
