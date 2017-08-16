import { takeLatest } from 'redux-saga';
import { call, put, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  GET_RECEIVED_INVOICES,
  GET_RECEIVED_INVOICES_URI,
} from './constants';
import {
  getReceivedInvoicesSuccess,
} from './actions';
import request from 'utils/request';

function* getInvoices() {
  const response = yield call(request, GET_RECEIVED_INVOICES_URI, {
    method: 'GET',
    credentials: 'include',
  });

  yield put(getReceivedInvoicesSuccess(response));
}

function* watchGetInvoices() {
  const watcher = yield takeLatest(GET_RECEIVED_INVOICES, getInvoices);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  watchGetInvoices,
];
