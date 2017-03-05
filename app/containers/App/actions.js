/*
 * Sign Up Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOGIN_SUBMIT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CHECK_LOGIN,
  LOGOUT_SUBMIT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  REMOVE_ERROR,
} from './constants';

export function submitLogin() {
  return {
    type: LOGIN_SUBMIT,
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
