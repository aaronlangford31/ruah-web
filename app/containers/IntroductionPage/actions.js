import {
  SUBMIT_INTRODUCTION_FORM,
  SUBMIT_INTRODUCTION_FORM_SUCCESS,
  SUBMIT_INTRODUCTION_FORM_FAIL,
} from './constants';

export function submitIntroductionForm() {
  return {
    type: SUBMIT_INTRODUCTION_FORM,
  };
}

export function submitIntroductionFormSuccess() {
  return {
    type: SUBMIT_INTRODUCTION_FORM_SUCCESS,
  };
}

export function submitIntroductionFormFail() {
  return {
    type: SUBMIT_INTRODUCTION_FORM_FAIL,
  };
}
