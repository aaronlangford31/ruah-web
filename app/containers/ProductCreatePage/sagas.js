/**
 * Gets the repositories of the user from Github
 */

import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { SUBMIT_CREATE_PRODUCT } from './constants';
import _ from 'underscore';
import {
  submitCreateProductSuccess,
  submitCreateProductError,
  invalidSkuDetected,
} from './actions';

import request from 'utils/request';
import { selectProductFields } from './selectors';
import { selectSupplierId } from '../LoginPage/selectors';

export function* createProductSubmit() {
  const signUpFields = yield select(selectProductFields());

  let body = [];

  if (signUpFields) {
    body = signUpFields.toJS();
    body.Bullets = _.pluck(body.Bullets, 'value');
  }

  const sku = body.SKU;
  const supplierId = yield select(selectSupplierId());

  const skuCheckURL = `http://api.teamruah.com/v1/product/SkuExists?sku=${sku}&supplierId=${supplierId}`;

  const validSku = yield call(request, skuCheckURL, {
    credentials: 'include',
  });

  if (validSku) {
    const userSignUpURL = 'http://api.teamruah.com/v1/product/batchCreate';

    try {
      // Call our request helper (see 'utils/request')
      yield call(request, userSignUpURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([body]),
        credentials: 'include',
      });
      yield put(submitCreateProductSuccess());
    } catch (err) {
      yield put(submitCreateProductError(`Error: ${err.message}`));
    }
  } else {
    yield put(invalidSkuDetected());
  }
}

/**
 * Root saga manages watcher lifecycle
 */

export function* createProductSubmitData() {
  yield* takeLatest(SUBMIT_CREATE_PRODUCT, createProductSubmit);
}

// Bootstrap sagas
export default [
  createProductSubmitData,
];