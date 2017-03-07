/**
 * Gets the repositories of the user from Github
 */

import request from 'utils/request';
import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { UPLOAD_PRODUCT_TEMPLATE_FILE } from './constants';
import { submitProductImport, submitProductImportSuccess, submitProductImportError } from './actions';
import { selectCsvData } from './selectors';

export function* submitImport() {
  const csvData = (yield select(selectCsvData())).toJS();
  const requestURL = 'http://api.teamruah.com/v1/product/bulkUploadCsv';

  try {
    // Call our request helper (see 'utils/request')
    yield put(submitProductImport());
    yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/csv',
      },
      body: csvData,
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
