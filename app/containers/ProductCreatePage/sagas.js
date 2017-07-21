import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { CREATE_PRODUCT_REQUEST } from './constants';
import _ from 'underscore';
import {
  submitCreateProductSuccess,
  submitCreateProductError,
  invalidSkuDetected,
} from './actions';

import request from 'utils/request';

export function* createProductSubmit({ values }) {
  let body = [];

  if (values) {
    body = values.toJS();
    body.Bullets = _.pluck(body.Bullets, 'value');
  }

  const sku = body.SKU;

  body.Created = (new Date()).toISOString();
  body.Updated = (new Date()).toISOString();

  const skuCheckURL = `https://api.teamruah.com/v1/product/SkuExists?sku=${sku}`;

  const validSku = yield call(request, skuCheckURL, {
    credentials: 'include',
  });

  if (!validSku) {
    const userSignUpURL = 'https://api.teamruah.com/v1/product/batchCreate';

    try {
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

export function* createProductSubmitData() {
  yield* takeLatest(CREATE_PRODUCT_REQUEST, createProductSubmit);
}

export default [
  createProductSubmitData,
];
