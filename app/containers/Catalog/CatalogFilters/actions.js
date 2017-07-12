import { fromJS } from 'immutable';
import {
  SET_SKU_FILTER,
  FILTER_PRODUCTS,
} from './constants';

export function filterProducts() {
  return {
    type: FILTER_PRODUCTS,
  };
}

export function setSKUFilter(SKU_Filter) {
  return {
    type: SET_SKU_FILTER,
    payload: { SKU_Filter },
  };
}
