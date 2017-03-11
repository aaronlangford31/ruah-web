/**
 * Gets the repositories of the user from Github
 */

import request from 'utils/request';
import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import papaparse from 'papaparse';
import { UPLOAD_PRODUCT_TEMPLATE_FILE } from './constants';
import { submitProductImport, submitProductImportSuccess, submitProductImportError } from './actions';
import { selectCsvData } from './selectors';

function readCsv(file) {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  const papaConfig = {
    complete: (results) => {
      deferred.resolve(results.data);
    },
  };
  papaparse.parse(file, papaConfig);
  return deferred.promise;
}

export function* submitImport() {
  const csvData = yield select(selectCsvData());
  const requestURL = 'http://api.teamruah.com/v1/product/csvBatchCreate';

  const data = yield readCsv(csvData);
  try {
    // Call our request helper (see 'utils/request')
    yield put(submitProductImport());
    yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    yield put(submitProductImportSuccess());
  } catch (err) {
    yield put(submitProductImportError(err));
  }
}

export function* getProductImportData() {
  yield* takeLatest(UPLOAD_PRODUCT_TEMPLATE_FILE, submitImport);
}

// Bootstrap sagas
export default [
  getProductImportData,
];
