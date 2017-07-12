import { takeLatest } from 'redux-saga';
import { put, take, cancel, select } from 'redux-saga/effects';
// import { Set } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
// import _ from 'underscore';
import { FILTER_PRODUCTS } from './constants';
import { searchProductsSuccess } from '../ChannelsCatalogPage/actions';
import { selectProducts } from '../ChannelsCatalogPage/selectors';

/**
 * TODO: Make this more robust, not just a series of if/else statements
 * @param {*} action
 */
export function* filterProducts(action) {
  const skuFilter = action.payload.skuFilter.toLowerCase();
  const products = yield select(selectProducts());
  if (skuFilter.trim().length === 0) {
    yield put(searchProductsSuccess(products));
    return;
  }

  const filteredProducts = products.filter((product) => {
    if (product.SKU.toLowerCase().indexOf(skuFilter) !== -1) {
      return true;
    }
    return false;
  });

  yield put(searchProductsSuccess(filteredProducts));
}

export function* watchFilterProducts() {
  const watcher = yield takeLatest(FILTER_PRODUCTS, filterProducts);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  watchFilterProducts,
];
