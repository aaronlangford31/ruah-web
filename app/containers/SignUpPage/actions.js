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
  INVALID_USER_ID_DETECTED,
  SUBMIT_SIGN_UP,
  SUBMIT_SIGN_UP_SUCCESS,
  SUBMIT_SIGN_UP_ERROR,
  CHECK_SIGN_UP_CODE,
  CHECK_SIGN_UP_CODE_SUCCESS,
  CHECK_SIGN_UP_CODE_ERROR,
} from './constants';

export function invalidUserIdDetected() {
  return {
    type: INVALID_USER_ID_DETECTED,
    error: 'Invalid user id. User Id Taken.',
  };
}

export function submitSignUp() {
  return {
    type: SUBMIT_SIGN_UP,
  };
}

export function submitSignUpComplete(result) {
  return {
    type: SUBMIT_SIGN_UP_SUCCESS,
    result,
  };
}

export function submitSignUpError(error) {
  return {
    type: SUBMIT_SIGN_UP_ERROR,
    error,
  };
}

export function checkSignUpCode() {
  return {
    type: CHECK_SIGN_UP_CODE,
  };
}

export function signUpCodeChecked(validSignUpCodeStatus) {
  return {
    type: CHECK_SIGN_UP_CODE_SUCCESS,
    validSignUpCodeStatus,
  };
}

export function signUpCodeCheckingError(error) {
  return {
    type: CHECK_SIGN_UP_CODE_ERROR,
    error,
  };
}
