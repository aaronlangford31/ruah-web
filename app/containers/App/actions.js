import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CHECK_LOGIN,
  LOGOUT_SUBMIT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  REMOVE_ERROR,
  GET_STORE,
  GET_STORE_NO_DATA,
  GET_STORE_SUCCESS,
  GET_STORE_FAIL,
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
