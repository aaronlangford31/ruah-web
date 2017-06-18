import { takeLatest } from 'redux-saga';
import { call, put, select, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import _ from 'underscore';
import {
  GET_PRODUCT_BY_ID,
  URI_GET_PRODUCT_BY_ID,
  SAVE_EDIT_CURRENT_PRODUCT,
  URI_PUT_PRODUCT,
} from './constants';
import {
  getProductByIdSuccess,
  getProductByIdNotFound,
  getProductByIdError,
  saveCurrentProductEditsSuccess,
  saveCurrentProductEditsFail,
} from './actions';
import { selectCurrentProductId, selectCurrentProduct } from './selectors';
import { selectProducts } from '../Catalog/MyCatalogPage/selectors';
import request from 'utils/request';

function* getProductById() {
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
      product.Bullets = _.map(product.Bullets, (content, title) => ({ content, title }));
      yield put(getProductByIdSuccess(product));
    } catch (err) {
      if (err.status === 404) {
        yield put(getProductByIdNotFound());
      } else {
        yield put(getProductByIdError());
      }
    }
  } else {
    const product = _.findWhere(localProducts.toJS(), { RuahId: currentProductId });
    if (product !== undefined) {
      yield put(getProductByIdSuccess(product));
    } else {
      yield put(getProductByIdNotFound());
    }
  }
}

function* putProductEdit() {
  const product = yield select(selectCurrentProduct());
  const proudctId = yield select(selectCurrentProductId());
  product.Bullets = _.reduce(product.Bullets,
    (dict, bullet) => {
      const mutated = dict;
      mutated[bullet.title] = bullet.content;
      return mutated;
    },
    {});
  try {
    yield call(
      request,
      `${URI_PUT_PRODUCT}?id=${proudctId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
        credentials: 'include',
      },
    );
    yield put(saveCurrentProductEditsSuccess());
  } catch (err) {
    yield put(saveCurrentProductEditsFail());
  }
}

export function* findProductById() {
  const watcher = yield takeLatest(GET_PRODUCT_BY_ID, getProductById);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* saveProduct() {
  const watcher = yield takeLatest(SAVE_EDIT_CURRENT_PRODUCT, putProductEdit);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  findProductById,
  saveProduct,
];
