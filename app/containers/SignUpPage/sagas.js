import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { CHECK_SIGN_UP_CODE, SUBMIT_SIGN_UP } from './constants';
import {
  signUpCodeChecked,
  signUpCodeCheckingError,
  invalidUserIdDetected,
  submitSignUpComplete,
  submitSignUpError,
} from './actions';

import request from 'utils/request';

export function* checkSignUpCode({ values }) {
  const signUpCode = values.get('code');
  const requestURL = `https://api.teamruah.com/v1/user/isValidSignUpCode?signUpCode=${signUpCode}`;

  try {
    const validSignUpCodeStatus = yield call(request, requestURL, {});
    if (validSignUpCodeStatus) {
      yield put(signUpCodeChecked(signUpCode));
    } else {
      yield put(signUpCodeCheckingError('Invalid Sign Up Code'));
    }
  } catch (err) {
    yield put(signUpCodeCheckingError(`Error: ${err.message}`));
  }
}

export function* submitSignUp({ values }) {
  const userId = values.get('email') ? values.get('email').toLowerCase() : '';

  const validUserIdURL = `https://api.teamruah.com/v1/user/userIdExists?userId=${userId}`;

  const validUserId = yield call(request, validUserIdURL, {});

  if (!validUserId) {
    const body = {
      signUpCode: values.get('code'),
      userId,
      password: values.get('password'),
    };

    try {
      const userSignUpURL = 'https://api.teamruah.com/v1/user/signup';
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

export function* signUpCodeData() {
  yield* takeLatest(CHECK_SIGN_UP_CODE, checkSignUpCode);
}

export function* signUpSubmitData() {
  yield* takeLatest(SUBMIT_SIGN_UP, submitSignUp);
}

export default [
  signUpCodeData,
  signUpSubmitData,
];
