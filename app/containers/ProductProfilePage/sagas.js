import { takeLatest } from 'redux-saga';
import { call, put, select, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import _ from 'underscore';
import {
  UPDATE_INVENTORY,
  GET_PRODUCT_BY_ID,
  URI_GET_PRODUCT_BY_ID,
} from './constants';
import {
  updateInventorySuccess,
  updateInventoryError,
  getProductByIdSuccess,
  getProductByIdNotFound,
  getProductByIdError,
} from './actions';
import { selectCurrentProductId } from './selectors';
import { selectProducts } from '../CatalogPage/selectors';
import request from 'utils/request';

export function* getProductById() {
  const currentProductId = yield select(selectCurrentProductId());
  const localProducts = yield select(selectProducts());
  if (localProducts.size === 0) {
    try {
      const product = yield call(request,
        `${URI_GET_PRODUCT_BY_ID}?id=${currentProductId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      );
      yield put(getProductByIdSuccess(product));
    } catch (err) {
      if (err.status === 404) {
        yield put(getProductByIdNotFound());
      } else {
        yield put(getProductByIdError());
      }
    }
  } else {
    const product = _.findWhere(localProducts, { RuahId: currentProductId });
    if (product !== undefined) {
      yield put(getProductByIdSuccess(product));
    } else {
      yield put(getProductByIdNotFound());
    }
  }
}

export function* updateInventory({ ruahId, inventory }) {
  const requestURL = `http://api.teamruah.com/v1/product/updateInventory?ruahId=${ruahId}&inventory=${inventory}`;
  try {
    yield call(request, requestURL, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    yield put(updateInventorySuccess());
  } catch (err) {
    yield put(updateInventoryError(`Error: ${err.message}`));
  }
}

export function* findProductById() {
  const watcher = yield takeLatest(GET_PRODUCT_BY_ID, getProductById);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* updateInventoryData() {
  const watcher = yield takeLatest(UPDATE_INVENTORY, updateInventory);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  findProductById,
  updateInventoryData,
];
