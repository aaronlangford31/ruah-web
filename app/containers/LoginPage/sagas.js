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

  const requestURL = 'http://api.teamruah.com/v1/user/authenticate';

  try {
    // Call our request helper (see 'utils/request')
    const loginStatus = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({
        userId: email.toLowerCase(),
        password: loginFields.password,
        persistAuthTicket: loginFields.remember,
      }),
    });
    yield put(loginSuccess(loginStatus));
  } catch (err) {
    yield put(loginError(`Error: ${err.message}`));
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
