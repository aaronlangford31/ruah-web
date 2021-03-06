import { takeLatest } from 'redux-saga';
import { call, put, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import _ from 'underscore';
import { GET_PRODUCTS, GET_PRODUCTS_URI } from './constants';
import { getProductsSuccess, getProductsError } from './actions';
import request from 'utils/request';

export function* getProducts() {
  try {
    let products = yield call(request, GET_PRODUCTS_URI, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    products = _.map(products, (product) => {
      const mutated = product;
      mutated.Bullets = _.map(product.Bullets, (content, title) => ({ title, content }));
      return mutated;
    });
    yield put(getProductsSuccess(products));
  } catch (err) {
    yield put(getProductsError(`Error: ${err.message}`));
  }
}

export function* watchGetProducts() {
  const watcher = yield takeLatest(GET_PRODUCTS, getProducts);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  watchGetProducts,
];
