/**
 * Gets the repositories of the user from Github
 */

import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { GET_PRODUCTS } from './constants';
import { getProductsSuccess, getProductsError } from './actions';
import request from 'utils/request';

export function* getProducts() {
  const requestURL = 'http://api.teamruah.com/v1/product/getproductcatalog';

  try {
    // Call our request helper (see 'utils/request')
    const products = yield call(request, requestURL, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    yield put(getProductsSuccess(products));
  } catch (err) {
    yield put(getProductsError(`Error: ${err.message}`));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* getProductsData() {
  yield* takeLatest(GET_PRODUCTS, getProducts);
}

// Bootstrap sagas
export default [
  getProductsData,
];
