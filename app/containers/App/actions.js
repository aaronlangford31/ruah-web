import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CHECK_LOGIN,
  LOGOUT_SUBMIT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  REMOVE_ERROR,
} from './constants';

export function login(values) {
  return {
    type: LOGIN_REQUEST,
    values,
  };
}

export function loginSuccess(userType) {
  return {
    type: LOGIN_SUCCESS,
    userType,
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
