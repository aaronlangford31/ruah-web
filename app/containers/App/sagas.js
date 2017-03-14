import request from 'utils/request';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import {
  CHECK_LOGIN,
  LOGOUT_SUBMIT,
  LOGIN_REQUEST,
} from './constants';
import { logoutSuccess, logoutError, loginSuccess, loginError } from './actions';

export function* checkLogin() {
  const requestURL = 'http://api.teamruah.com/v1/user/isauthenticated';

  try {
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

export function* submitLogin({ values }) {
  const requestURL = 'http://api.teamruah.com/v1/user/authenticate';

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: values.get('email').toLowerCase(),
        password: values.get('password'),
        persistAuthTicket: values.get('remember'),
      }),
      credentials: 'include',
    });

    yield put(loginSuccess(response.userType));
  } catch (err) {
    yield put(loginError('There is no flavor. There are no spices. Where are the chips? ...these credentials were no good.'));
  }
}

export function* getCheckLoginData() {
  yield* takeLatest(CHECK_LOGIN, checkLogin);
}

export function* submitLogoutData() {
  yield* takeLatest(LOGOUT_SUBMIT, submitLogout);
}

export function* submitLoginData() {
  yield* takeLatest(LOGIN_REQUEST, submitLogin);
}

export default [
  getCheckLoginData,
  submitLogoutData,
  submitLoginData,
];
