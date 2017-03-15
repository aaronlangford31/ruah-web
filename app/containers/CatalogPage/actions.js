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
