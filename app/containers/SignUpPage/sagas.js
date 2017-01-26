/**
 * Gets the repositories of the user from Github
 */

import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { CHECK_SIGN_UP_CODE, SUBMIT_SIGN_UP } from './constants';
import { signUpCodeChecked, signUpCodeCheckingError, invalidUserIdDetected, submitSignUpComplete, submitSignUpError } from './actions';

import request from 'utils/request';
import { selectCode, selectSignUpFields, selectValidSignUpCode } from './selectors';

export function* checkSignUpCode() {
  const signUpCode = yield select(selectCode());

  const requestURL = `http://api.teamruah.com/v1/user/isValidSignUpCode?signUpCode=${signUpCode}`;

  try {
    // Call our request helper (see 'utils/request')
    const validSignUpCodeStatus = yield call(request, requestURL);
    if (validSignUpCodeStatus) {
      yield put(signUpCodeChecked(signUpCode));
    } else {
      yield put(signUpCodeCheckingError('Invalid Sign Up Code'));
    }
  } catch (err) {
    yield put(signUpCodeCheckingError(`Error: ${err.message}`));
  }
}

export function* submitSignUp() {
  const signUpFields = (yield select(selectSignUpFields())).toJS();
  const userId = signUpFields.email ? signUpFields.email.toLowerCase() : '';

  const validUserIdURL = `http://api.teamruah.com/v1/user/userIdExists?userId=${userId}`;

  const validUserId = yield call(request, validUserIdURL);

  if (!validUserId) {
    const body = {
      signUpCode: yield select(selectValidSignUpCode()),
      userId,
      password: signUpFields.password,
    };

    const userSignUpURL = 'http://api.teamruah.com/v1/user/signup';

    try {
      // Call our request helper (see 'utils/request')
      yield call(request, userSignUpURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      yield put(submitSignUpComplete());
    } catch (err) {
      yield put(submitSignUpError(`Error: ${err.message}`));
    }
  } else {
    yield put(invalidUserIdDetected());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* signUpCodeData() {
  yield* takeLatest(CHECK_SIGN_UP_CODE, checkSignUpCode);
}

export function* signUpSubmitData() {
  yield* takeLatest(SUBMIT_SIGN_UP, submitSignUp);
}

// Bootstrap sagas
export default [
  signUpCodeData,
  signUpSubmitData,
];
