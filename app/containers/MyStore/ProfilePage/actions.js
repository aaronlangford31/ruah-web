import {
  GET_STORE,
  GET_STORE_SUCCESS,
  START_EDIT_STORE,
  CANCEL_EDIT_STORE,
  SAVE_EDIT_STORE,
  SAVE_EDIT_STORE_FAIL,
  EDIT_STORE,
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
