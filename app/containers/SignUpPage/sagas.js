import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { CHECK_SIGN_UP_CODE, SUBMIT_SIGN_UP, SUBMIT_STORE } from './constants';
import {
  signUpCodeChecked,
  signUpCodeCheckingError,
  invalidUserIdDetected,
  submitSignUpComplete,
  submitSignUpError,
  setSignUpStage,
  setStoreId,
} from './actions';
import { selectCode, selectStoreForm, selectStoreId, selectSignUpFields } from './selectors';
import request from 'utils/request';

function* checkSignUpCode() {
  const signUpCode = yield select(selectCode());
  const requestURL = `https://api.teamruah.com/v1/user/isValidSignUpCode?signUpCode=${signUpCode}`;

  try {
    const validSignUpCodeStatus = yield call(request, requestURL, {});
    if (validSignUpCodeStatus.Valid) {
      yield put(signUpCodeChecked(signUpCode));
    } else {
      yield put(signUpCodeCheckingError('Invalid Sign Up Code'));
      return;
    }
    if (validSignUpCodeStatus.StoreId) {
      yield put(setStoreId(validSignUpCodeStatus.StoreId));
    }
    yield put(setSignUpStage(2));
  } catch (err) {
    yield put(signUpCodeCheckingError(`Error: ${err.message}`));
  }
}

function* submitSignUp() {
  const storeId = yield select(selectStoreId());
  const credentialsForm = yield select(selectSignUpFields());

  const validUserIdURL = `https://api.teamruah.com/v1/user/userIdExists?userId=${credentialsForm.email}`;
  const userExists = yield call(request, validUserIdURL, {});

  const validStoreIdURL = `https://api.teamruah.com/v1/store/getById?storeId=@${credentialsForm.storeId}`;
  const storeExists = yield call(request, validStoreIdURL, {});

  if (!userExists && !storeExists) {
    const body = {
      signUpCode: credentialsForm.code,
      userId: credentialsForm.email,
      password: credentialsForm.password,
      storeId: `@${credentialsForm.storeId}`,
    };

    try {
      const userSignUpURL = 'https://api.teamruah.com/v1/user/signup';
      yield call(request, userSignUpURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      yield put(submitSignUpComplete());
      yield put(setStoreId(`@${credentialsForm.storeId}`));
      if (storeId) {
        yield put(push('/'));
      } else {
        yield put(setSignUpStage(3));
      }
    } catch (err) {
      yield put(submitSignUpError(`Error: ${err.message}`));
    }
  } else {
    yield put(invalidUserIdDetected());
  }
}

function* createStore() {
  const storeForm = yield select(selectStoreForm());
  const storeId = yield select(selectStoreId());
  const validStoreIdURL = `https://api.teamruah.com/v1/store/getById?storeId=${storeId}`;
  const storeExists = yield call(request, validStoreIdURL, {});

  if (!storeExists) {
    const data = new FormData();
    data.append('logo', storeForm.logo[0]);

    const mediaUploadResult = yield call(request, `https://api.teamruah.com/v1/media/storeprofile?storeId=${storeId}`, {
      method: 'POST',
      credentials: 'include',
      body: data,
    });

    const body = {
      StoreId: storeId,
      Name: storeForm.name,
      Slogan: storeForm.slogan,
      ProfilePicUri: mediaUploadResult.locations[0],
      Founded: storeForm.founded,
      Story: storeForm.story,
      TaxonomicClassifications: [],
      MarketResources: [],
      Locality: storeForm.city,
      Sovereignty: storeForm.sovereignty,
    };

    if (storeForm.accessories) {
      body.TaxonomicClassifications.push('Clothing & Accessories');
    }
    if (storeForm.electronics) {
      body.TaxonomicClassifications.push('Electronics');
    }
    if (storeForm.food) {
      body.TaxonomicClassifications.push('Food');
    }
    if (storeForm.personalCare) {
      body.TaxonomicClassifications.push('Personal Care & Beauty');
    }
    if (storeForm.sportingGoods) {
      body.TaxonomicClassifications.push('Sporting Goods');
    }
    if (storeForm.pets) {
      body.TaxonomicClassifications.push('Pet Care & Accessories');
    }
    if (storeForm.other) {
      body.TaxonomicClassifications.push(storeForm.OtherDetail);
    }

    if (storeForm.buying) {
      body.MarketResources.push('Buyer');
    }
    if (storeForm.selling) {
      body.MarketResources.push('Seller');
    }

    try {
      const userSignUpURL = 'https://api.teamruah.com/v1/store/create';
      yield call(request, userSignUpURL, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      yield put(submitSignUpComplete());
      yield put(push('/'));
    } catch (err) {
      yield put(submitSignUpError(`Error: ${err.message}`));
    }
  } else {
    yield put(invalidUserIdDetected());
  }
}

function* signUpCodeData() {
  yield* takeLatest(CHECK_SIGN_UP_CODE, checkSignUpCode);
}

function* signUpSubmitData() {
  yield* takeLatest(SUBMIT_SIGN_UP, submitSignUp);
}

function* watchSubmitStore() {
  yield* takeLatest(SUBMIT_STORE, createStore);
}

export default [
  signUpCodeData,
  signUpSubmitData,
  watchSubmitStore,
];
