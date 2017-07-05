import { fromJS } from 'immutable';
import {
  FILTER_PRODUCTS,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  REMOVE_ERROR,
  PAGE_FORWARD,
  PAGE_BACKWARD,
} from './constants';

export function filterProducts(filter) {
  return {
    type: FILTER_PRODUCTS,
    payload: fromJS({ filter }),
  };
}

export function getProducts() {
  return {
    type: GET_PRODUCTS,
  };
}

export function getProductsSuccess(products) {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: fromJS({ products }),
  };
}

export function getProductsError(error) {
  return {
    type: GET_PRODUCTS_ERROR,
    payload: fromJS({ error }),
  };
}

export function removeError() {
  return {
    type: REMOVE_ERROR,
  };
}

export function pageForward() {
  return {
    type: PAGE_FORWARD,
  };
}

export function pageBackward() {
  return {
    type: PAGE_BACKWARD,
  };
}
