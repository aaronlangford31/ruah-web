import { fromJS } from 'immutable';
import {
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_NOT_FOUND,
  GET_PRODUCT_BY_ID_ERROR,
  UPDATE_INVENTORY,
  UPDATE_INVENTORY_SUCCESS,
  UPDATE_INVENTORY_ERROR,
} from './constants';

export function getProductById(RuahId) {
  return {
    type: GET_PRODUCT_BY_ID,
    RuahId,
  };
}

export function getProductByIdSuccess(product) {
  return {
    type: GET_PRODUCT_BY_ID_SUCCESS,
    product,
  };
}

export function getProductByIdNotFound() {
  return {
    type: GET_PRODUCT_BY_ID_NOT_FOUND,
  };
}

export function getProductByIdError() {
  return {
    type: GET_PRODUCT_BY_ID_ERROR,
  };
}

export function updateInventory(payload) {
  return {
    type: UPDATE_INVENTORY,
    payload: fromJS(payload),
  };
}

export function updateInventorySuccess() {
  return {
    type: UPDATE_INVENTORY_SUCCESS,
  };
}

export function updateInventoryError(error) {
  return {
    type: UPDATE_INVENTORY_ERROR,
    payload: fromJS({ error }),
  };
}
