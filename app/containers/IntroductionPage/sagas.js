import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import {
  SUBMIT_INTRODUCTION_FORM,
  FORM_POST_URI,
} from './constants';
import {
  submitIntroductionFormSuccess,
  submitIntroductionFormFail,
} from './actions';
import { selectIntroductionFormData } from './selectors';
import request from 'utils/request';

export function* postIntroductionForm() {
  const introFormInfo = yield select(selectIntroductionFormData());
  try {
    yield call(request, FORM_POST_URI, {
      method: 'POST',
      body: introFormInfo,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    yield put(submitIntroductionFormSuccess());
  } catch (err) {
    yield put(submitIntroductionFormFail());
  }
}

export function* submitIntroductionForm() {
  yield* takeLatest(SUBMIT_INTRODUCTION_FORM, postIntroductionForm);
}

export default [
  submitIntroductionForm,
];
