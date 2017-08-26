import { takeLatest } from 'redux-saga';
import { call, put, take, cancel, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import _ from 'underscore';
import { GET_PRODUCTS, GET_PRODUCTS_URI, FILTER_PRODUCTS } from './constants';
import { getProductsSuccess, getProductsError, filterProductsSuccess } from './actions';
import { selectProducts } from './selectors';
import request from 'utils/request';

function* getProducts() {
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

function* applyFilter(action) {
  const products = yield select(selectProducts());
  const filter = action.payload.get('filter').toLowerCase();
  const filtered = _.filter(products, (p) => p.SKU.toLowerCase().includes(filter)
    || p.ProductName.toLowerCase().includes(filter)
    || p.Description.toLowerCase().includes(filter)
  );
  yield put(filterProductsSuccess(filtered));
}

function* watchGetProducts() {
  const watcher = yield takeLatest(GET_PRODUCTS, getProducts);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

function* watchFilterProducts() {
  const watcher = yield takeLatest(FILTER_PRODUCTS, applyFilter);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  watchGetProducts,
  watchFilterProducts,
];
