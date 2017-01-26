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
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  REMOVE_ERROR,
} from './constants';

export function getProducts() {
  return {
    type: GET_PRODUCTS,
  };
}

export function getProductsSuccess(products) {
  return {
    type: GET_PRODUCTS_SUCCESS,
    products,
  };
}

export function getProductsError() {
  return {
    type: GET_PRODUCTS_ERROR,
  };
}

export function removeError() {
  return {
    type: REMOVE_ERROR,
  };
}
