import {
  INVALID_USER_ID_DETECTED,
  SUBMIT_SIGN_UP,
  SUBMIT_SIGN_UP_SUCCESS,
  SUBMIT_SIGN_UP_ERROR,
  CHECK_SIGN_UP_CODE,
  CHECK_URI_CODE,
  CHECK_SIGN_UP_CODE_SUCCESS,
  CHECK_SIGN_UP_CODE_ERROR,
  REMOVE_ERROR,
  SET_SIGN_UP_STAGE,
  SUBMIT_STORE,
  SET_STORE_ID,
} from './constants';

export function invalidUserIdDetected() {
  return {
    type: INVALID_USER_ID_DETECTED,
    error: 'Invalid user id. User Id Taken.',
  };
}

export function submitSignUp(values) {
  return {
    type: SUBMIT_SIGN_UP,
    values,
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

export function checkSignUpCode(values) {
  return {
    type: CHECK_SIGN_UP_CODE,
    values,
  };
}

export function checkUriCode(code) {
  return {
    type: CHECK_URI_CODE,
    code,
  };
}

export function signUpCodeChecked(code) {
  return {
    type: CHECK_SIGN_UP_CODE_SUCCESS,
    code,
  };
}

export function signUpCodeCheckingError(error) {
  return {
    type: CHECK_SIGN_UP_CODE_ERROR,
    error,
  };
}

export function removeError() {
  return {
    type: REMOVE_ERROR,
  };
}

export function setSignUpStage(stage) {
  return {
    type: SET_SIGN_UP_STAGE,
    stage,
  };
}

export function submitStore(values) {
  return {
    type: SUBMIT_STORE,
    values,
  };
}

export function setStoreId(storeId) {
  return {
    type: SET_STORE_ID,
    storeId,
  };
}
