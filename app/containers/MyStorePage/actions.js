import {
  GET_STORE,
  GET_STORE_NO_DATA,
  GET_STORE_SUCCESS,
  GET_STORE_FAIL,
  START_EDIT_STORE,
  CANCEL_EDIT_STORE,
  SAVE_EDIT_STORE,
  SAVE_EDIT_STORE_FAIL,
  EDIT_STORE,
} from './constants';

export function startEditStore() {
  return {
    type: START_EDIT_STORE,
  };
}

export function cancelEditStore() {
  return {
    type: CANCEL_EDIT_STORE,
  };
}

export function saveStoreEdits() {
  return {
    type: SAVE_EDIT_STORE,
  };
}

export function saveStoreEditsFail() {
  return {
    type: SAVE_EDIT_STORE_FAIL,
  };
}

export function editStore(field, newVal) {
  return {
    type: EDIT_STORE,
    field,
    newVal,
  };
}

export function getStore() {
  return {
    type: GET_STORE,
  };
}

export function getStoreSucess(store) {
  return {
    type: GET_STORE_SUCCESS,
    store,
  };
}

export function getStoreNoData() {
  return {
    type: GET_STORE_NO_DATA,
  };
}

export function getStoreFail() {
  return {
    type: GET_STORE_FAIL,
  };
}
