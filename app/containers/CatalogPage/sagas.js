import { takeLatest } from 'redux-saga';
import { call, put, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { GET_PRODUCTS } from './constants';
import { getProductsSuccess, getProductsError } from './actions';
import request from 'utils/request';

export function* getProducts() {
  const requestURL = 'http://api.teamruah.com/v1/product/getproductcatalog';

  try {
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

export function* getProductsData() {
  const watcher = yield takeLatest(GET_PRODUCTS, getProducts);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  getProductsData,
];
