import { fromJS } from 'immutable';
import {
  SEARCH_PRODUCTS,
  SEARCH_PRODUCTS_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  REMOVE_ERROR,
  SET_QUERY,
  SET_AUTOCOMPLETE,
} from './constants';

export function setQuery(query) {
  return {
    type: SET_QUERY,
    payload: { query },
  };
}

export function setAutocomplete(items) {
  return {
    type: SET_AUTOCOMPLETE,
    payload: fromJS({ items }),
  };
}

export function searchProducts(products, query) {
  return {
    type: SEARCH_PRODUCTS,
    payload: fromJS({ products, query }),
  };
}

export function searchProductsSuccess(filteredProducts) {
  return {
    type: SEARCH_PRODUCTS_SUCCESS,
    payload: fromJS({ filteredProducts }),
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
