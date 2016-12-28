/**
 * Gets the repositories of the user from Github
 */

import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { LOGIN_SUBMIT } from './constants';
import { loginSuccess, loginError } from './actions';
import request from 'utils/request';
import { selectLoginFields } from './selectors';

export function* submitLogin() {
  const loginFields = (yield select(selectLoginFields())).toJS();
  const email = loginFields.email;

  const requestURL = `http://api.teamruah.com/v1/user/isValidSignUpCode?signUpCode=${email}`;

  try {
    // Call our request helper (see 'utils/request')
    const validSignUpCodeStatus = yield call(request, requestURL);
    yield put(loginSuccess(validSignUpCodeStatus));
  } catch (err) {
    yield put(loginError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* submitLoginData() {
  yield* takeLatest(LOGIN_SUBMIT, submitLogin);
}

// Bootstrap sagas
export default [
  submitLoginData,
];
