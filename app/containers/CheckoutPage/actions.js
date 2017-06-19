import {
  ADD_ITEM_TO_CART,
} from './constants';

export function addItemToCart(product) {
  return {
    type: ADD_ITEM_TO_CART,
    product,
  };
}
