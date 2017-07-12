import {
  SET_SKU_FILTER,
  FILTER_PRODUCTS,
} from './constants';

export function filterProducts() {
  return {
    type: FILTER_PRODUCTS,
  };
}

export function setSKUFilter(skuFilter) {
  return {
    type: SET_SKU_FILTER,
    payload: { skuFilter },
  };
}
