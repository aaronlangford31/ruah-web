import {
  SUBMIT_INTRODUCTION_FORM,
  SUBMIT_INTRODUCTION_FORM_SUCCESS,
  SUBMIT_INTRODUCTION_FORM_FAIL,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
  formSubmitted: false,
});

function signUpPageReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_INTRODUCTION_FORM:
      return state
        .set('loading', true);
    case SUBMIT_INTRODUCTION_FORM_SUCCESS:
    case SUBMIT_INTRODUCTION_FORM_FAIL:
      return state
        .set('loading', false)
        .set('formSubmitted', true);
    default:
      return state;
  }
}

export default signUpPageReducer;
