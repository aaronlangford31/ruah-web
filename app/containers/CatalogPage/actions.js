import { fromJS } from 'immutable';
import {
  FILTER_PRODUCTS,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  OPEN_GROUP,
  CLOSE_GROUP,
  REMOVE_ERROR,
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

export function openGroup(groupId) {
  return {
    type: OPEN_GROUP,
    payload: fromJS({ groupId }),
  };
}
export function closeGroup(groupId) {
  return {
    type: CLOSE_GROUP,
    payload: fromJS({ groupId }),
  };
}

export function removeError() {
  return {
    type: REMOVE_ERROR,
  };
}
