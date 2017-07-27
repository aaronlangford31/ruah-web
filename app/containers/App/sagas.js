import request from 'utils/request';
import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import _ from 'underscore';
import {
  CHECK_LOGIN,
  LOGOUT_SUBMIT,
  LOGIN_REQUEST,
  GET_STORE,
  GET_STORE_URI,
  SUBMIT_SEARCH,
  SEARCH_PRODUCT_URI,
  SEARCH_STORE_URI,
} from './constants';
import {
  logoutSuccess,
  logoutError,
  loginSuccess,
  loginError,
  requestCredentials,
  getStore as getStoreAction,
  getStoreSucess,
  getStoreFail,
  getProductSuccess,
} from './actions';
import { selectLocationOnSuccess } from './selectors';

export function* checkLogin() {
  const requestURL = 'https://api.teamruah.com/v1/user/isauthenticated';

  try {
    const response = yield call(request, requestURL, {
      credentials: 'include',
    });

    yield put(getStoreAction(response.userId));
    yield put(loginSuccess(response.userId, response.storeId));
  } catch (err) {
    const loc = window.location.pathname;
    yield put(requestCredentials(loc));
    yield put(push('/'));
  }
}

export function* submitLogout() {
  const requestURL = 'https://api.teamruah.com/v1/user/signout';

  try {
    const response = yield call(fetch, requestURL, {
      credentials: 'include',
    });

    if (response.status === 200) {
      yield put(logoutSuccess());
    } else {
      yield put(logoutError());
    }
  } catch (err) {
    // not checked
    yield put(logoutError('Error'));
  }
}

export function* submitLogin({ values }) {
  const requestURL = 'https://api.teamruah.com/v1/user/authenticate';

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: values.get('email').toLowerCase(),
        password: values.get('password'),
        persistAuthTicket: values.get('remember'),
      }),
      credentials: 'include',
    });

    const locationOnSuccess = yield select(selectLocationOnSuccess());
    yield put(getStoreAction(response.userId));
    yield put(loginSuccess(response.userId, response.storeId));

    yield put(push(locationOnSuccess));
  } catch (err) {
    yield put(loginError('There is no flavor. There are no spices. Where are the chips? ...these credentials were no good.'));
  }
}

function* getStore() {
  try {
    const store = yield call(request, GET_STORE_URI, {
      method: 'GET',
      credentials: 'include',
    });
    yield put(getStoreSucess(store));
  } catch (err) {
    yield put(getStoreFail());
  }
}

function* omniSearch(action) {
  const productResults = yield call(request, `${SEARCH_PRODUCT_URI}?query=${action.query}`, {
    method: 'GET',
    credentials: 'include',
  });
  const storeResults = yield call(request, `${SEARCH_STORE_URI}?query=${action.query}`, {
    method: 'GET',
    credentials: 'include',
  });
  const searchResults = Array.concat(productResults, storeResults);
  searchResults.sort((a, b) => b.Score - a.Score);
  yield put(getProductSuccess(_.map(searchResults, (item) => item.Item)));
  yield put(push('/search'));
}

export function* getCheckLoginData() {
  yield* takeLatest(CHECK_LOGIN, checkLogin);
}

export function* submitLogoutData() {
  yield* takeLatest(LOGOUT_SUBMIT, submitLogout);
}

export function* submitLoginData() {
  yield* takeLatest(LOGIN_REQUEST, submitLogin);
}

export function* onGetStore() {
  yield* takeLatest(GET_STORE, getStore);
}

function* watchSearch() {
  yield takeLatest(SUBMIT_SEARCH, omniSearch);
}

export default [
  getCheckLoginData,
  submitLogoutData,
  submitLoginData,
  onGetStore,
  watchSearch,
];
