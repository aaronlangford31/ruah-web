import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CHECK_LOGIN,
  LOGOUT_SUBMIT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  REMOVE_ERROR,
  REQUEST_CREDENTIALS,
  GET_STORE,
  GET_STORE_NO_DATA,
  GET_STORE_SUCCESS,
  GET_STORE_FAIL,
  SUBMIT_SEARCH,
  SUBMIT_SEARCH_SUCCESS,
  TOGGLE_INVITATION_MODAL_OPEN,
  SUBMIT_INVITE,
  SUBMIT_INVITE_SUCCESS,
} from './constants';

export function login(values) {
  return {
    type: LOGIN_REQUEST,
    values,
  };
}

export function loginSuccess(userId, storeId) {
  return {
    type: LOGIN_SUCCESS,
    userId,
    storeId,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}

export function checkLogin() {
  return {
    type: CHECK_LOGIN,
  };
}

export function removeError() {
  return {
    type: REMOVE_ERROR,
  };
}

export function requestCredentials(locationOnSuccess) {
  return {
    type: REQUEST_CREDENTIALS,
    locationOnSuccess,
  };
}

export function submitLogout() {
  return {
    type: LOGOUT_SUBMIT,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function logoutError(error) {
  return {
    type: LOGOUT_ERROR,
    error,
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

export function submitSearch(query) {
  return {
    type: SUBMIT_SEARCH,
    query,
  };
}

export function submitSearchSuccess(products) {
  return {
    type: SUBMIT_SEARCH_SUCCESS,
    products,
  };
}

export function toggleInvitationModalOpen(isOpen) {
  return {
    type: TOGGLE_INVITATION_MODAL_OPEN,
    isOpen,
  };
}

export function submitInvite(email) {
  return {
    type: SUBMIT_INVITE,
    email,
  };
}

export function submitInviteSuccess() {
  return {
    type: SUBMIT_INVITE_SUCCESS,
  };
}
