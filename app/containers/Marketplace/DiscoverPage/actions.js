import {
  GET_STORES,
  GET_STORES_SUCCESS,
  GET_STORES_FAIL,
} from './constants';

export function getStores() {
  return {
    type: GET_STORES,
  };
}

export function getStoresSucess(stores) {
  return {
    type: GET_STORES_SUCCESS,
    stores,
  };
}

export function getStoresFail() {
  return {
    type: GET_STORES_FAIL,
  };
}
