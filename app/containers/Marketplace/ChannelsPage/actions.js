import {
  GET_STORE_SUCCESS,
  GET_STORE_FAIL,
  GET_STORE,
} from './constants';

export function getStore() {
  return {
    type: GET_STORE,
  };
}

export function getStoreSuccess(store) {
  return {
    type: GET_STORE_SUCCESS,
    store,
  };
}

export function getStoreFail() {
  return {
    type: GET_STORE_FAIL,
  };
}
