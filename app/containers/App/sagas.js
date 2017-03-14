/**
 * Gets the repositories of the user from Github
 */

import request from 'utils/request';
import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import {
  CHECK_LOGIN,
  LOGOUT_SUBMIT,
  LOGIN_SUBMIT,
} from './constants';
import { logoutSuccess, logoutError, loginSuccess, loginError } from './actions';
import { selectLoginFields } from './selectors';

export function* checkLogin() {
  const requestURL = 'http://api.teamruah.com/v1/user/isauthenticated';

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(fetch, requestURL, {
      credentials: 'include',
    });

    if (response.status === 200) {
      yield put(loginSuccess('default', 'default'));
    }
  } catch (err) {
    // not checked
  }
}

export function* submitLogout() {
  const requestURL = 'http://api.teamruah.com/v1/user/signout';

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(fetch, requestURL, {
      credentials: 'include',
    });

    if (response.status === 200) {
      yield put(logoutSuccess());
    } else {
      yield put(logoutError());
    }
  } catch (err) {
    // not checked
    yield put(logoutError('Error'));
  }
}

export function* submitLogin() {
  const loginFields = (yield select(selectLoginFields())).toJS();
  const email = loginFields.email;

  const requestURL = 'http://api.teamruah.com/v1/user/authenticate';

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: email.toLowerCase(),
        password: loginFields.password,
        persistAuthTicket: loginFields.remember,
      }),
      credentials: 'include',
    });

    yield put(loginSuccess(response.userType));
  } catch (err) {
    yield put(loginError('There is no flavor. There are no spices. Where are the chips? ...these credentials were no good.'));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* getCheckLoginData() {
  yield* takeLatest(CHECK_LOGIN, checkLogin);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* submitLogoutData() {
  yield* takeLatest(LOGOUT_SUBMIT, submitLogout);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* submitLoginData() {
  yield* takeLatest(LOGIN_SUBMIT, submitLogin);
}

// Bootstrap sagas
export default [
  getCheckLoginData,
  submitLogoutData,
  submitLoginData,
];
