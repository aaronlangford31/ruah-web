import { takeLatest } from 'redux-saga';
import { call, put, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { UPDATE_INVENTORY } from './constants';
import { updateInventorySuccess, updateInventoryError } from './actions';
import request from 'utils/request';

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

export function* updateInventoryData() {
  const watcher = yield takeLatest(UPDATE_INVENTORY, updateInventory);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  updateInventoryData,
];
