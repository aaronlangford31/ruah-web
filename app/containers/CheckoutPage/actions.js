import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  UPDATE_ITEM_QUANTITY,
  UPDATE_SHIPPING_FORM,
  SUBMIT_ORDER,
  SUBMIT_ORDER_SUCCESS,
} from './constants';

export function addItemToCart(product) {
  return {
    type: ADD_ITEM_TO_CART,
    product,
  };
}

export function removeItemFromCart(ix) {
  return {
    type: REMOVE_ITEM_FROM_CART,
    ix,
  };
}

export function updateItemQuantity(ix, quantity) {
  return {
    type: UPDATE_ITEM_QUANTITY,
    ix,
    quantity,
  };
}

export function updateShippingForm(field, newVal) {
  return {
    type: UPDATE_SHIPPING_FORM,
    field,
    newVal,
  };
}

export function submitOrder() {
  return {
    type: SUBMIT_ORDER,
  };
}

export function submitOrderSuccess() {
  return {
    type: SUBMIT_ORDER_SUCCESS,
  };
}
