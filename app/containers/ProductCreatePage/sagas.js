/**
 * Gets the repositories of the user from Github
 */

import { takeLatest } from 'redux-saga';
import { /* call, put,*/select } from 'redux-saga/effects';
import { CREATE_PRODUCT } from './constants';
import _ from 'underscore';
// import {  } from './actions';

// import request from 'utils/request';
import { selectProductFields } from './selectors';

export function* createProductSubmit() {
  const signUpFields = yield select(selectProductFields());

  let body = [];

  if (signUpFields) {
    body = signUpFields.toJS();
    body.Bullets = _.pluck(body.Bullets, 'value');
  }

  // console.log(body);

  // const validUserIdURL = `http://api.teamruah.com/v1/user/userIdExists?userId=${userId}`;
  //
  // const validUserId = yield call(request, validUserIdURL);
  //
  // if (!validUserId) {
  //   const body = {
  //     signUpCode: yield select(selectValidSignUpCode()),
  //     userId,
  //     password: signUpFields.password,
  //   };
  //
  //   const userSignUpURL = 'http://api.teamruah.com/v1/product/batchCreate';
  //
  //   try {
  //     // Call our request helper (see 'utils/request')
  //     yield call(request, userSignUpURL, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(body),
  //     });
  //     yield put(submitSignUpComplete());
  //   } catch (err) {
  //     yield put(submitSignUpError(`Error: ${err.message}`));
  //   }
  // } else {
  //   yield put(invalidUserIdDetected());
  // }
}

/**
 * Root saga manages watcher lifecycle
 */

export function* createProductSubmitData() {
  yield* takeLatest(CREATE_PRODUCT, createProductSubmit);
}

// Bootstrap sagas
export default [
  createProductSubmitData,
];
