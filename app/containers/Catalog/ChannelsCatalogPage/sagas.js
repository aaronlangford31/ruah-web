import { takeLatest } from 'redux-saga';
import { call, put, take, cancel, select } from 'redux-saga/effects';
import { Set } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import _ from 'underscore';
import { GET_PRODUCTS, GET_PRODUCTS_URI, SEARCH_PRODUCTS } from './constants';
import { getProductsSuccess, getProductsError, searchProductsSuccess, setAutocomplete } from './actions';
import { selectProducts } from './selectors';
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

    // Only put the manufacturer name in for the autocomplete for now, it's getting late
    const items = new Set(_.map(products, (product) => product.ManufacturerName));
    yield put(setAutocomplete(items.toArray()));
  } catch (err) {
    yield put(getProductsError(`Error: ${err.message}`));
  }
}

export function* searchProducts(action) {
  const query = action.payload.get('query').toLowerCase();
  const products = yield select(selectProducts());
  if (query.trim().length === 0) {
    yield put(searchProductsSuccess(products));
    return;
  }
  const filteredProducts = products.filter((product) => {
    if (product.ManufacturerName.toLowerCase() === query) {
      return true;
    }
    return false;
  });
  yield put(searchProductsSuccess(filteredProducts));
}

export function* watchSearchProducts() {
  const watcher = yield takeLatest(SEARCH_PRODUCTS, searchProducts);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* watchGetProducts() {
  const watcher = yield takeLatest(GET_PRODUCTS, getProducts);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  watchGetProducts,
  watchSearchProducts,
];
